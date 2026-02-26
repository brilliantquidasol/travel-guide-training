import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from './schemas/tour.schema';
import { paginate, PaginationQuery } from '../common/dto/pagination.dto';

@Injectable()
export class ToursService {
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
  ) {}

  async create(dto: Partial<Tour>) {
    const doc = await this.tourModel.create(dto);
    return doc.toObject();
  }

  async findAll(
    query: PaginationQuery & { destinationId?: string; minDays?: number; maxPrice?: number },
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const filter: Record<string, unknown> = {};
    if (query.destinationId) filter.destinations = query.destinationId;
    if (query.minDays != null) filter.durationDays = { $gte: query.minDays };
    if (query.maxPrice != null) filter.priceFrom = { $lte: query.maxPrice };

    const [items, total] = await Promise.all([
      this.tourModel
        .find(filter)
        .populate('destinations', 'name slug country')
        .sort({ priceFrom: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.tourModel.countDocuments(filter),
    ]);
    return paginate(items, total, page, limit);
  }

  async findBySlug(slug: string) {
    const doc = await this.tourModel
      .findOne({ slug })
      .populate('destinations', 'name slug country continent')
      .lean();
    if (!doc) throw new NotFoundException('Tour not found');
    return doc;
  }

  async findById(id: string) {
    const doc = await this.tourModel
      .findById(id)
      .populate('destinations', 'name slug country')
      .lean();
    if (!doc) throw new NotFoundException('Tour not found');
    return doc;
  }

  async update(id: string, dto: Partial<Tour>) {
    const doc = await this.tourModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('destinations', 'name slug country')
      .lean();
    if (!doc) throw new NotFoundException('Tour not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.tourModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Tour not found');
    return { deleted: true, id };
  }
}
