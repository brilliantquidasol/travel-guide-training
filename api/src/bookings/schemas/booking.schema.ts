import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookingDocument = HydratedDocument<Booking>;

@Schema({ timestamps: true })
export class Booking {
  /** Relationship: Booking belongs to one User */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  /** Relationship: Booking belongs to one Trip */
  @Prop({ type: Types.ObjectId, ref: 'Trip', required: true })
  trip: Types.ObjectId;

  @Prop({ enum: ['tour', 'hotel', 'other'], required: true })
  productType: 'tour' | 'hotel' | 'other';

  /** ID of the bookable entity (Tour, Hotel, Room, etc.) per productType */
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'USD' })
  currency: string;

  @Prop({ enum: ['pending', 'confirmed', 'canceled'], default: 'pending' })
  status: 'pending' | 'confirmed' | 'canceled';

  @Prop()
  paymentId: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.index({ user: 1 });
BookingSchema.index({ trip: 1 });
BookingSchema.index({ status: 1 });
