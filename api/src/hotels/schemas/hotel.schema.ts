import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true })
export class Hotel {
  /** Relationship: Hotel belongs to one Destination */
  @Prop({ type: Types.ObjectId, ref: 'Destination', required: true })
  destination: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ type: { address: String, city: String, country: String }, default: () => ({}) })
  location: { address?: string; city?: string; country?: string };

  @Prop({ type: [String], default: [] })
  gallery: string[];

  /** Luxury positioning & copy (seed) */
  @Prop()
  shortPitch: string;
  @Prop()
  longDescription: string;
  @Prop()
  luxuryPositioning: string;
  @Prop()
  heroImageAlt: string;
  @Prop({ type: [String], default: [] })
  galleryAltTexts: string[];
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
HotelSchema.index({ slug: 1 });
HotelSchema.index({ destination: 1 });
