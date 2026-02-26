import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { paginate, PaginationQuery } from '../common/dto/pagination.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async findAll(
    query: PaginationQuery & { userId?: string; tripId?: string; status?: string },
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const filter: Record<string, unknown> = {};
    if (query.userId) filter.user = query.userId;
    if (query.tripId) filter.trip = query.tripId;
    if (query.status) filter.status = query.status;

    const [items, total] = await Promise.all([
      this.bookingModel
        .find(filter)
        .populate('user', 'email')
        .populate('trip', 'title startDate endDate status')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.bookingModel.countDocuments(filter),
    ]);
    return paginate(items, total, page, limit);
  }

  async findById(id: string) {
    const doc = await this.bookingModel
      .findById(id)
      .populate('user', 'email')
      .populate('trip', 'title startDate endDate status')
      .lean();
    if (!doc) throw new NotFoundException('Booking not found');
    return doc;
  }

  async create(dto: {
    user: string;
    trip: string;
    productType: 'tour' | 'hotel' | 'other';
    productId: string;
    price: number;
    currency?: string;
    status?: 'pending' | 'confirmed' | 'canceled';
    paymentId?: string;
  }) {
    const doc = await this.bookingModel.create(dto);
    return doc.toObject();
  }

  async updatePaymentStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'canceled',
    paymentId?: string,
  ) {
    const doc = await this.bookingModel
      .findByIdAndUpdate(
        id,
        { status, ...(paymentId != null && { paymentId }) },
        { new: true },
      )
      .lean();
    if (!doc) throw new NotFoundException('Booking not found');
    return doc;
  }

  async updatePaymentStatusByPaymentId(
    paymentId: string,
    status: 'pending' | 'confirmed' | 'canceled',
  ) {
    const doc = await this.bookingModel
      .findOneAndUpdate(
        { paymentId },
        { status },
        { new: true },
      )
      .lean();
    return doc;
  }
}
