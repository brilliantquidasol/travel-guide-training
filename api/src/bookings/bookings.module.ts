import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
    ]),
    UsersModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService, JwtAuthGuard, AdminGuard],
  exports: [BookingsService],
})
export class BookingsModule {}
