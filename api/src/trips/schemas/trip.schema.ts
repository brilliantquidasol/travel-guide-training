import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TripDocument = HydratedDocument<Trip>;

/** Single item in the trip itinerary (tour day, hotel stay, etc.) */
@Schema({ _id: false })
export class ItineraryItem {
  @Prop()
  type: string; // e.g. 'tour', 'hotel', 'activity'
  @Prop()
  productId: string; // ref to Tour/Hotel/Booking etc.
  @Prop()
  date: Date;
  @Prop()
  title: string;
  @Prop()
  notes: string;
}
const ItineraryItemSchema = SchemaFactory.createForClass(ItineraryItem);

@Schema({ timestamps: true })
export class Trip {
  /** Relationship: Trip belongs to one User */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ enum: ['draft', 'booked', 'completed', 'canceled'], default: 'draft' })
  status: 'draft' | 'booked' | 'completed' | 'canceled';

  /** Plan-trip form fields (v1); AI can use these later */
  @Prop()
  originCity: string;
  @Prop()
  budget: number;
  @Prop({ default: 1 })
  travelerCount: number;
  @Prop()
  travelStyle: string;
  @Prop({ type: [Types.ObjectId], ref: 'Destination', default: [] })
  destinationIds: Types.ObjectId[];

  @Prop({ type: [ItineraryItemSchema], default: [] })
  itinerary: ItineraryItem[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
TripSchema.index({ user: 1 });
TripSchema.index({ status: 1 });
