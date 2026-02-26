import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { Room, RoomDocument } from './schemas/room.schema';
import { paginate, PaginationQuery } from '../common/dto/pagination.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  async createHotel(dto: Partial<Hotel>) {
    const doc = await this.hotelModel.create(dto);
    return doc.toObject();
  }

  async findAllHotels(
    query: PaginationQuery & { destinationId?: string; minRating?: number },
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const filter: Record<string, unknown> = {};
    if (query.destinationId) filter.destination = query.destinationId;
    if (query.minRating != null) filter.rating = { $gte: query.minRating };

    const [items, total] = await Promise.all([
      this.hotelModel
        .find(filter)
        .populate('destination', 'name slug country')
        .sort({ rating: -1, name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.hotelModel.countDocuments(filter),
    ]);
    return paginate(items, total, page, limit);
  }

  async findHotelBySlug(slug: string) {
    const doc = await this.hotelModel
      .findOne({ slug })
      .populate('destination', 'name slug country')
      .lean();
    if (!doc) throw new NotFoundException('Hotel not found');
    return doc;
  }

  async findHotelById(id: string) {
    const doc = await this.hotelModel
      .findById(id)
      .populate('destination', 'name slug country')
      .lean();
    if (!doc) throw new NotFoundException('Hotel not found');
    return doc;
  }

  async updateHotel(id: string, dto: Partial<Hotel>) {
    const doc = await this.hotelModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('destination', 'name slug country')
      .lean();
    if (!doc) throw new NotFoundException('Hotel not found');
    return doc;
  }

  async removeHotel(id: string) {
    const doc = await this.hotelModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Hotel not found');
    await this.roomModel.deleteMany({ hotel: id });
    return { deleted: true, id };
  }

  // --- Rooms (nested under hotel; relationship: room -> hotel)
  async createRoom(dto: Partial<Room>) {
    const doc = await this.roomModel.create(dto);
    return doc.toObject();
  }

  async findRoomsByHotel(
    hotelId: string,
    query: PaginationQuery & { minCapacity?: number; maxPrice?: number },
  ) {
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(query.limit) || 20));
    const filter: Record<string, unknown> = { hotel: hotelId };
    if (query.minCapacity != null) filter.capacity = { $gte: query.minCapacity };
    if (query.maxPrice != null) filter.pricePerNight = { $lte: query.maxPrice };

    const [items, total] = await Promise.all([
      this.roomModel
        .find(filter)
        .sort({ pricePerNight: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      this.roomModel.countDocuments(filter),
    ]);
    return paginate(items, total, page, limit);
  }

  async findRoomById(id: string) {
    const doc = await this.roomModel
      .findById(id)
      .populate('hotel', 'name slug destination')
      .lean();
    if (!doc) throw new NotFoundException('Room not found');
    return doc;
  }

  async updateRoom(id: string, dto: Partial<Room>) {
    const doc = await this.roomModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('hotel', 'name slug')
      .lean();
    if (!doc) throw new NotFoundException('Room not found');
    return doc;
  }

  async removeRoom(id: string) {
    const doc = await this.roomModel.findByIdAndDelete(id);
    if (!doc) throw new NotFoundException('Room not found');
    return { deleted: true, id };
  }
}
