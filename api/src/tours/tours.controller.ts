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
import { ToursService } from './tours.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminOnly } from '../common/decorators/admin-only.decorator';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('destinationId') destinationId?: string,
    @Query('minDays') minDays?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    return this.toursService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      destinationId,
      minDays: minDays ? Number(minDays) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.toursService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toursService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  create(@Body() body: Record<string, unknown>) {
    return this.toursService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.toursService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  remove(@Param('id') id: string) {
    return this.toursService.remove(id);
  }
}
