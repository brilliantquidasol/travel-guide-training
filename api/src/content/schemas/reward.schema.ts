import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RewardDocument = HydratedDocument<Reward>;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  pointsCost: number;

  @Prop()
  imagePrompt: string;

  @Prop()
  imageAltText: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: 0 })
  order: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);
