import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DestinationDocument = HydratedDocument<Destination>;

@Schema({ timestamps: true })
export class Destination {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  continent: string;

  @Prop({ required: true })
  country: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  summary: string;

  @Prop()
  heroImage: string;

  @Prop({ type: [String], default: [] })
  gallery: string[];

  @Prop()
  bestTimeToVisit: string;

  /** Ideal trip length in days: { min, max } */
  @Prop({
    type: {
      min: { type: Number },
      max: { type: Number },
    },
    default: () => ({ min: 3, max: 7 }),
  })
  idealTripLength: { min: number; max: number };

  /** SEO & long-form content (seed/CMS) */
  @Prop()
  seoTitle: string;
  @Prop()
  seoDescription: string;
  @Prop()
  longDescription: string;
  @Prop({ type: [String], default: [] })
  highlights: string[];
  @Prop()
  travelTips: string;
  /** Alt text for hero and gallery (accessibility) */
  @Prop()
  heroImageAlt: string;
  @Prop({ type: [String], default: [] })
  galleryAltTexts: string[];
}

export const DestinationSchema = SchemaFactory.createForClass(Destination);
DestinationSchema.index({ slug: 1 });
DestinationSchema.index({ continent: 1, country: 1 });
