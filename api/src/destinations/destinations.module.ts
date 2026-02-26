import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Destination, DestinationSchema } from './schemas/destination.schema';
import { DestinationsController } from './destinations.controller';
import { DestinationsService } from './destinations.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Destination.name, schema: DestinationSchema },
    ]),
    UsersModule,
  ],
  controllers: [DestinationsController],
  providers: [DestinationsService, JwtAuthGuard, AdminGuard],
  exports: [DestinationsService],
})
export class DestinationsModule {}
