import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from './schemas/tour.schema';
import { ToursController } from './tours.controller';
import { ToursService } from './tours.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    UsersModule,
  ],
  controllers: [ToursController],
  providers: [ToursService, JwtAuthGuard, AdminGuard],
  exports: [ToursService],
})
export class ToursModule {}
