import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BenefitDocument = HydratedDocument<Benefit>;

@Schema({ timestamps: true })
export class Benefit {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'LoyaltyTier', default: [] })
  tierIds: Types.ObjectId[];

  @Prop({ default: 0 })
  order: number;
}

export const BenefitSchema = SchemaFactory.createForClass(Benefit);
