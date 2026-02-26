import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TourDocument = HydratedDocument<Tour>;

/** Single day in the itinerary */
@Schema({ _id: false })
export class ItineraryDay {
  @Prop()
  day: number;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: [String], default: [] })
  activities: string[];
}
const ItineraryDaySchema = SchemaFactory.createForClass(ItineraryDay);

@Schema({ timestamps: true })
export class Tour {
  /** Destinations this tour visits; relationship: many-to-many with Destination */
  @Prop({ type: [Types.ObjectId], ref: 'Destination', default: [] })
  destinations: Types.ObjectId[];

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  durationDays: number;

  @Prop()
  groupSize: number;

  @Prop({ required: true })
  priceFrom: number;

  @Prop({ type: [String], default: [] })
  highlights: string[];

  @Prop({ type: [String], default: [] })
  inclusions: string[];

  @Prop({ type: [String], default: [] })
  exclusions: string[];

  @Prop({ type: [ItineraryDaySchema], default: [] })
  itinerary: ItineraryDay[];

  /** Marketing & CMS (seed) */
  @Prop()
  shortDescription: string;
  @Prop()
  longDescription: string;
  @Prop()
  difficulty: string;
  @Prop({ default: false })
  featured: boolean;
  @Prop({ type: [String], default: [] })
  categories: string[];
  @Prop()
  discountPrice: number;
  @Prop()
  importantNotes: string;
  @Prop({ type: [String], default: [] })
  gallery: string[];
  @Prop({ type: [String], default: [] })
  galleryAltTexts: string[];
}

export const TourSchema = SchemaFactory.createForClass(Tour);
TourSchema.index({ slug: 1 });
TourSchema.index({ destinations: 1 });
