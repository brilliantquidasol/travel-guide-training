import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminOnly } from '../common/decorators/admin-only.decorator';

interface RequestWithUser extends Request {
  user?: { id: string; sub?: string };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: RequestWithUser) {
    const userId = req.user?.id ?? req.user?.sub;
    if (!userId) throw new Error('User id not set');
    return this.usersService.findById(userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('role') role?: string,
  ) {
    return this.usersService.findAll({
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      role,
    });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @AdminOnly()
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}
