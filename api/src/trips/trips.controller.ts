import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TripsService } from './trips.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminOnly } from '../common/decorators/admin-only.decorator';

interface RequestWithUser extends Request {
  user?: { id: string; sub?: string };
}

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('userId') userId?: string,
    @Query('status') status?: string,
  ) {
    return this.tripsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      status,
    });
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  findAdmin(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    return this.tripsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
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
    return this.tripsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      userId,
      status,
    });
  }

  @Get('admin/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  findOneAdmin(@Param('id') id: string) {
    return this.tripsService.findById(id);
  }

  @Get(':id')
  findOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    const uid = (req.headers['x-user-id'] as string) || undefined;
    return this.tripsService.findById(id, uid);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Req() req: RequestWithUser,
    @Body()
    body: {
      title: string;
      startDate: string;
      endDate: string;
      originCity?: string;
      budget?: number;
      travelerCount?: number;
      travelStyle?: string;
      destinationIds?: string[];
      itinerary?: { type: string; productId: string; date: string; title: string; notes?: string }[];
    },
  ) {
    const userId = req.user?.id ?? req.user?.sub;
    if (!userId) throw new Error('User id not set by auth guard');
    const payload = {
      title: body.title,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      originCity: body.originCity,
      budget: body.budget,
      travelerCount: body.travelerCount,
      travelStyle: body.travelStyle,
      destinationIds: body.destinationIds,
      itinerary: (body.itinerary ?? []).map((it) => ({
        type: it.type,
        productId: it.productId,
        date: it.date ? new Date(it.date) : undefined,
        title: it.title,
        notes: it.notes,
      })),
    };
    return this.tripsService.create(payload as any, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body()
    body: Partial<{
      title: string;
      startDate: string;
      endDate: string;
      status: string;
      originCity: string;
      budget: number;
      travelerCount: number;
      travelStyle: string;
      destinationIds: string[];
      itinerary: { type: string; productId: string; date: string; title: string; notes?: string }[];
    }>,
  ) {
    const userId = req.user?.id ?? req.user?.sub;
    if (!userId) throw new Error('User id not set by auth guard');
    const payload: any = { ...body };
    if (body?.startDate) payload.startDate = new Date(body.startDate);
    if (body?.endDate) payload.endDate = new Date(body.endDate);
    if (body?.itinerary)
      payload.itinerary = body.itinerary.map((it) => ({
        type: it.type,
        productId: it.productId,
        date: it.date ? new Date(it.date) : undefined,
        title: it.title,
        notes: it.notes,
      }));
    return this.tripsService.update(id, payload, userId);
  }
}
