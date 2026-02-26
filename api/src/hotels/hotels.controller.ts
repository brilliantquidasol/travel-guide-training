import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminOnly } from '../common/decorators/admin-only.decorator';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  findAllHotels(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('destinationId') destinationId?: string,
    @Query('minRating') minRating?: string,
  ) {
    return this.hotelsService.findAllHotels({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      destinationId,
      minRating: minRating ? Number(minRating) : undefined,
    });
  }

  @Get('by-slug/:slug')
  findHotelBySlug(@Param('slug') slug: string) {
    return this.hotelsService.findHotelBySlug(slug);
  }

  @Get(':id')
  findOneHotel(@Param('id') id: string) {
    return this.hotelsService.findHotelById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  createHotel(@Body() body: Record<string, unknown>) {
    return this.hotelsService.createHotel(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  updateHotel(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.hotelsService.updateHotel(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  removeHotel(@Param('id') id: string) {
    return this.hotelsService.removeHotel(id);
  }
}

@Controller('rooms')
export class RoomsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('hotel/:hotelId')
  findRoomsByHotel(
    @Param('hotelId') hotelId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('minCapacity') minCapacity?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.hotelsService.findRoomsByHotel(hotelId, {
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      minCapacity: minCapacity ? Number(minCapacity) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelsService.findRoomById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  create(@Body() body: Record<string, unknown>) {
    return this.hotelsService.createRoom(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.hotelsService.updateRoom(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  remove(@Param('id') id: string) {
    return this.hotelsService.removeRoom(id);
  }
}
