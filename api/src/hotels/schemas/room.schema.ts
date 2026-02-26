import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  /** Parent hotel; relationship: Room belongs to one Hotel */
  @Prop({ type: Types.ObjectId, ref: 'Hotel', required: true })
  hotel: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacity: number;

  @Prop()
  bedType: string;

  @Prop({ required: true })
  pricePerNight: number;

  @Prop({ default: 0 })
  inventory: number;

  /** Content & media (seed) */
  @Prop()
  description: string;
  @Prop()
  size: string;
  @Prop()
  imagePrompt: string;
  @Prop()
  imageAltText: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
RoomSchema.index({ hotel: 1 });
