import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { TripsService } from '../trips/trips.service';
import { BookingsService } from '../bookings/bookings.service';
import { ToursService } from '../tours/tours.service';
import { HotelsService } from '../hotels/hotels.service';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';

export type CheckoutLineItem = {
  productType: 'tour' | 'hotel' | 'other';
  productId: string;
  title: string;
  priceCents: number;
  quantity: number;
};

export type CreateSessionDto = {
  tripId: string;
  /** Optional: book only these items; if omitted, book all itinerary items */
  items?: { productType: 'tour' | 'hotel'; productId: string }[];
  successUrl?: string;
  cancelUrl?: string;
};

@Injectable()
export class CheckoutService {
  constructor(
    private tripsService: TripsService,
    private bookingsService: BookingsService,
    private toursService: ToursService,
    private hotelsService: HotelsService,
    private stripeService: StripeService,
    private config: ConfigService,
  ) {}

  /**
   * Resolve price for an itinerary item from DB (tour -> priceFrom; hotel/room -> pricePerNight).
   * Returns price in dollars; we convert to cents for Stripe.
   */
  private async resolvePrice(
    productType: string,
    productId: string,
  ): Promise<{ priceCents: number; title: string }> {
    if (productType === 'tour') {
      const tour = await this.toursService.findById(productId);
      if (!tour) throw new NotFoundException(`Tour not found: ${productId}`);
      return {
        priceCents: Math.round((tour.priceFrom ?? 0) * 100),
        title: tour.title ?? 'Tour',
      };
    }
    if (productType === 'hotel') {
      try {
        const room = await this.hotelsService.findRoomById(productId);
        return {
          priceCents: Math.round((room.pricePerNight ?? 0) * 100),
          title: `${room.name ?? 'Room'} (per night)`,
        };
      } catch {
        try {
          const hotel = await this.hotelsService.findHotelById(productId);
          return {
            priceCents: 9900,
            title: `${hotel.name ?? 'Hotel'} (per night, default rate)`,
          };
        } catch {
          throw new NotFoundException(`Hotel or room not found: ${productId}`);
        }
      }
    }
    return { priceCents: 0, title: 'Item' };
  }

  /**
   * Build line items and create pending bookings for the given trip (and optional item filter).
   */
  async createCheckoutSession(userId: string, dto: CreateSessionDto): Promise<{ url: string; sessionId: string }> {
    const stripe = this.stripeService.stripe;
    if (!stripe || !this.stripeService.isConfigured) {
      throw new BadRequestException('Stripe is not configured. Set STRIPE_SECRET_KEY.');
    }
    const trip = await this.tripsService.findById(dto.tripId, userId);
    if (!trip) throw new NotFoundException('Trip not found');
    if (String((trip as any).user?._id ?? (trip as any).user) !== userId) {
      throw new ForbiddenException('You can only checkout your own trips');
    }

    const itinerary = (trip as any).itinerary ?? [];
    let toBook: { type: string; productId: string; title: string }[] = [];

    if (dto.items && dto.items.length > 0) {
      toBook = dto.items.map((i) => ({
        type: i.productType,
        productId: i.productId,
        title: i.productType === 'tour' ? 'Tour' : 'Hotel stay',
      }));
    } else {
      toBook = itinerary
        .filter((it: any) => it.type === 'tour' || it.type === 'hotel')
        .map((it: any) => ({
          type: it.type,
          productId: it.productId,
          title: it.title ?? (it.type === 'tour' ? 'Tour' : 'Hotel stay'),
        }));
    }

    if (toBook.length === 0) {
      throw new BadRequestException('No bookable items (tours or hotels) in this trip');
    }

    const lineItems: CheckoutLineItem[] = [];
    for (const it of toBook) {
      const { priceCents, title } = await this.resolvePrice(it.type, it.productId);
      if (priceCents <= 0) continue;
      lineItems.push({
        productType: it.type as 'tour' | 'hotel',
        productId: it.productId,
        title,
        priceCents,
        quantity: 1,
      });
    }

    if (lineItems.length === 0) {
      throw new BadRequestException('No items with valid price to book');
    }

    const currency = 'usd';
    const bookingIds: string[] = [];
    for (const line of lineItems) {
      const booking = await this.bookingsService.create({
        user: userId,
        trip: dto.tripId,
        productType: line.productType,
        productId: line.productId,
        price: line.priceCents / 100,
        currency: currency.toUpperCase(),
        status: 'pending',
      });
      bookingIds.push((booking as any)._id.toString());
    }

    const appUrl =
      this.config.get<string>('NEXT_PUBLIC_APP_URL') ??
      this.config.get<string>('FRONTEND_URL') ??
      'http://localhost:3000';
    const successPath = this.config.get<string>('STRIPE_SUCCESS_PATH') ?? '/checkout/success';
    const cancelPath = this.config.get<string>('STRIPE_CANCEL_PATH') ?? '/checkout/cancel';
    const successUrl = dto.successUrl ?? `${appUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = dto.cancelUrl ?? `${appUrl}${cancelPath}?trip_id=${dto.tripId}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems.map((li) => ({
        price_data: {
          currency,
          unit_amount: li.priceCents,
          product_data: {
            name: li.title,
            description: `${li.productType} · ${li.productId}`,
          },
        },
        quantity: li.quantity,
      })),
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: dto.tripId,
      metadata: {
        userId,
        tripId: dto.tripId,
        bookingIds: bookingIds.join(','),
      },
    });

    if (!session.url) {
      throw new Error('Stripe did not return a checkout URL');
    }
    return { url: session.url, sessionId: session.id };
  }

  /**
   * Handle checkout.session.completed: mark bookings as confirmed and set paymentId.
   */
  async handleSessionCompleted(session: { id: string; payment_status?: string; metadata?: Record<string, string> }) {
    const bookingIdsStr = session.metadata?.bookingIds;
    if (!bookingIdsStr) return;
    const ids = bookingIdsStr.split(',').filter(Boolean);
    const paymentId = session.id;
    for (const id of ids) {
      await this.bookingsService.updatePaymentStatus(id, 'confirmed', paymentId);
    }
  }

  /**
   * Handle session expired/failed: mark pending bookings from session metadata as canceled.
   */
  async handleSessionExpired(session: { metadata?: Record<string, string> | null }) {
    const bookingIdsStr = session.metadata?.bookingIds;
    if (!bookingIdsStr) return;
    const ids = bookingIdsStr.split(',').filter(Boolean);
    for (const id of ids) {
      await this.bookingsService.updatePaymentStatus(id, 'canceled');
    }
  }
}
