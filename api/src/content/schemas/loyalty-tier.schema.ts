import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LoyaltyTierDocument = HydratedDocument<LoyaltyTier>;

@Schema({ timestamps: true })
export class LoyaltyTier {
  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  minPoints: number;

  @Prop()
  maxPoints: number;

  @Prop({ type: [String], default: [] })
  perkDescriptions: string[];

  @Prop({ default: 0 })
  order: number;
}

export const LoyaltyTierSchema = SchemaFactory.createForClass(LoyaltyTier);
