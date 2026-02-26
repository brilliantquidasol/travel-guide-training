import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TripTemplateDocument = HydratedDocument<TripTemplate>;

@Schema({ _id: false })
export class TemplateDay {
  @Prop()
  day: number;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: [String], default: [] })
  activityIds: string[];
  @Prop()
  hotelId: string;
  @Prop()
  tourId: string;
}
const TemplateDaySchema = SchemaFactory.createForClass(TemplateDay);

@Schema({ timestamps: true })
export class TripTemplate {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ type: [Types.ObjectId], ref: 'Destination', default: [] })
  destinationIds: Types.ObjectId[];

  @Prop({ required: true })
  totalDays: number;

  @Prop({ type: [TemplateDaySchema], default: [] })
  days: TemplateDay[];

  @Prop()
  budgetEstimateMin: number;

  @Prop()
  budgetEstimateMax: number;

  @Prop()
  description: string;

  @Prop()
  luxuryToneDescription: string;
}

export const TripTemplateSchema = SchemaFactory.createForClass(TripTemplate);
