import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schemas/hotel.schema';
import { Room, RoomSchema } from './schemas/room.schema';
import { HotelsController, RoomsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Hotel.name, schema: HotelSchema },
        { name: Room.name, schema: RoomSchema },
      ],
    ),
    UsersModule,
  ],
  controllers: [HotelsController, RoomsController],
  providers: [HotelsService, JwtAuthGuard, AdminGuard],
  exports: [HotelsService],
})
export class HotelsModule {}
