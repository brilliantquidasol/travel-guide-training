import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminOnly } from '../common/decorators/admin-only.decorator';

interface RequestWithUser extends Request {
  user?: { id: string; sub?: string };
}

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  findAdmin(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
    @Query('tripId') tripId?: string,
    @Query('status') status?: string,
  ) {
    return this.bookingsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      tripId,
      status,
    });
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMy(
    @Req() req: RequestWithUser,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    const userId = req.user?.id ?? req.user?.sub;
    return this.bookingsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      status,
    });
  }

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
    @Query('tripId') tripId?: string,
    @Query('status') status?: string,
  ) {
    return this.bookingsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      tripId,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }
}
