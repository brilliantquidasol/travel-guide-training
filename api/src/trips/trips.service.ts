import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument, ItineraryItem } from './schemas/trip.schema';
import { paginate, PaginationQuery } from '../common/dto/pagination.dto';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
  ) {}

  /** List trips; when userId is provided filter by it (e.g. "me" from auth) */
  async findAll(query: PaginationQuery & { userId?: string; status?: string }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const filter: Record<string, unknown> = {};
    if (query.userId) filter.user = query.userId;
    if (query.status) filter.status = query.status;

    const [items, total] = await Promise.all([
      this.tripModel
        .find(filter)
        .populate('user', 'email')
        .populate('destinationIds', 'name slug')
        .sort({ startDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.tripModel.countDocuments(filter),
    ]);
    return paginate(items, total, page, limit);
  }

  /** Get trip by id; optional userId to enforce ownership (return 404 if not owner) */
  async findById(id: string, userId?: string) {
    const doc = await this.tripModel
      .findById(id)
      .populate('user', 'email')
      .populate('destinationIds', 'name slug')
      .lean();
    if (!doc) throw new NotFoundException('Trip not found');
    if (userId && String(doc.user._id ?? doc.user) !== userId)
      throw new ForbiddenException('You can only view your own trips');
    return doc;
  }

  /** Create trip for authenticated user */
  async create(
    dto: Partial<Trip> & { itinerary?: ItineraryItem[] },
    userId: string,
  ) {
    const doc = await this.tripModel.create({
      ...dto,
      user: userId,
      itinerary: dto.itinerary ?? [],
    });
    return this.tripModel
      .findById(doc._id)
      .populate('user', 'email')
      .populate('destinationIds', 'name slug')
      .lean();
  }

  /** Update trip; only owner can update */
  async update(
    id: string,
    dto: Partial<Trip> & { itinerary?: ItineraryItem[] },
    userId: string,
  ) {
    const existing = await this.tripModel.findById(id);
    if (!existing) throw new NotFoundException('Trip not found');
    if (String(existing.user) !== userId)
      throw new ForbiddenException('You can only update your own trips');
    const doc = await this.tripModel
      .findByIdAndUpdate(
        id,
        {
          ...dto,
          ...(dto.itinerary !== undefined && { itinerary: dto.itinerary }),
        },
        { new: true },
      )
      .populate('user', 'email')
      .populate('destinationIds', 'name slug')
      .lean();
    return doc;
  }
}
