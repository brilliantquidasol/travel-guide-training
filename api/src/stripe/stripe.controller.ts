import {
  Body,
  Controller,
  Post,
  Req,
  Headers,
  UseGuards,
  RawBodyRequest,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { StripeService } from './stripe.service';
import { CheckoutService } from './checkout.service';
import Stripe from 'stripe';

interface RequestWithUser extends Request {
  user?: { id: string; sub?: string };
}

@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private checkoutService: CheckoutService,
  ) {}

  @Post('create-checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Req() req: RequestWithUser,
    @Body()
    body: {
      tripId: string;
      items?: { productType: 'tour' | 'hotel'; productId: string }[];
      successUrl?: string;
      cancelUrl?: string;
    },
  ) {
    const userId = req.user?.id ?? req.user?.sub;
    if (!userId) throw new BadRequestException('Not authenticated');
    if (!body.tripId) throw new BadRequestException('tripId is required');
    return this.checkoutService.createCheckoutSession(userId, {
      tripId: body.tripId,
      items: body.items,
      successUrl: body.successUrl,
      cancelUrl: body.cancelUrl,
    });
  }

  @Post('webhook')
  async webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new BadRequestException('Raw body required for webhook verification');
    }
    if (!this.stripeService.webhookSecret || !this.stripeService.isConfigured) {
      throw new BadRequestException('Stripe webhook is not configured');
    }
    let event: Stripe.Event;
    try {
      event = this.stripeService.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        this.stripeService.webhookSecret,
      );
    } catch (err: any) {
      throw new BadRequestException(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.payment_status === 'paid') {
          await this.checkoutService.handleSessionCompleted({
            id: session.id,
            payment_status: session.payment_status,
            metadata: session.metadata as Record<string, string> | null ?? undefined,
          });
        }
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session;
        await this.checkoutService.handleSessionExpired({
          metadata: session.metadata as Record<string, string> | null ?? undefined,
        });
        break;
      }
      default:
        break;
    }

    return { received: true };
  }
}
