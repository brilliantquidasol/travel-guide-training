import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationsModule } from './destinations/destinations.module';
import { ToursModule } from './tours/tours.module';
import { HotelsModule } from './hotels/hotels.module';
import { TripsModule } from './trips/trips.module';
import { BookingsModule } from './bookings/bookings.module';
import { UsersModule } from './users/users.module';
import { StripeModule } from './stripe/stripe.module';
import { ContentModule } from './content/content.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/travel-guide',
      }),
    }),
    UsersModule,
    DestinationsModule,
    ToursModule,
    HotelsModule,
    TripsModule,
    BookingsModule,
    StripeModule,
    ContentModule,
  ],
})
export class AppModule {}
