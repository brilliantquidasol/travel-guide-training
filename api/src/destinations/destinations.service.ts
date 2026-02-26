import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Destination, DestinationDocument } from './schemas/destination.schema';
import { paginate, PaginationQuery } from '../common/dto/pagination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name)
    private destinationModel: Model<DestinationDocument>,
  ) {}

  async create(dto: Partial<Destination>) {
    const doc = await this.destinationModel.create(dto);
    return doc.toObject();
  }

  async findAll(query: PaginationQuery & { continent?: string; country?: string }) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const filter: Record<string, unknown> = {};
    if (query.continent) filter.continent = query.continent;
    if (query.country) filter.country = query.country;

    const [items, total] = await Promise.all([
      this.destinationModel
        .find(filter)
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.destinationModel.countDocuments(filter),
    ]);
    return paginate(items, total, page, limit);
  }

  async findBySlug(slug: string) {
    const doc = await this.destinationModel.findOne({ slug }).lean();
    if (!doc) throw new NotFoundException('Destination not found');
    return doc;
  }

  async findById(id: string) {
    const doc = await this.destinationModel.findById(id).lean();
    if (!doc) throw new NotFoundException('Destination not found');
    return doc;
  }

  async update(id: string, dto: Partial<Destination>) {
    const doc = await this.destinationModel
      .findByIdAndUpdate(id, dto, { new: true })
      .lean();
    if (!doc) throw new NotFoundException('Destination not found');
    return doc;
  }

  async remove(id: string) {
    const doc = await this.destinationModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Destination not found');
    return { deleted: true, id };
  }
}
