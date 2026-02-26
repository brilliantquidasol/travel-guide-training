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
import { DestinationsService } from './destinations.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminOnly } from '../common/decorators/admin-only.decorator';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  /** Public read: list with pagination and optional filters */
  @Get()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('continent') continent?: string,
    @Query('country') country?: string,
  ) {
    return this.destinationsService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      continent,
      country,
    });
  }

  @Get('by-slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.destinationsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.destinationsService.findById(id);
  }

  /** Admin-only write */
  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  create(@Body() body: Record<string, unknown>) {
    return this.destinationsService.create(body);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.destinationsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  remove(@Param('id') id: string) {
    return this.destinationsService.remove(id);
  }
}
