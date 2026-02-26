import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';

export const ADMIN_ONLY = 'adminOnly';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireAdmin = this.reflector.get<boolean>(
      ADMIN_ONLY,
      context.getHandler(),
    );
    if (!requireAdmin) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub ?? request.user?.id;
    if (!userId) throw new UnauthorizedException('Not authenticated');

    const user = await this.userModel.findById(userId).lean();
    if (!user || user.role !== 'admin')
      throw new UnauthorizedException('Admin access required');
    return true;
  }
}
