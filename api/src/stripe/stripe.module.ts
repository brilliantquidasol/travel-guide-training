import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { CheckoutService } from './checkout.service';
import { StripeController } from './stripe.controller';
import { TripsModule } from '../trips/trips.module';
import { BookingsModule } from '../bookings/bookings.module';
import { ToursModule } from '../tours/tours.module';
import { HotelsModule } from '../hotels/hotels.module';

@Module({
  imports: [
    ConfigModule,
    TripsModule,
    BookingsModule,
    ToursModule,
    HotelsModule,
  ],
  controllers: [StripeController],
  providers: [StripeService, CheckoutService],
  exports: [StripeService, CheckoutService],
})
export class StripeModule {}
