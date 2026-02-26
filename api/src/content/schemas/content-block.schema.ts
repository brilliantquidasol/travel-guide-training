import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContentBlockDocument = HydratedDocument<ContentBlock>;

@Schema({ timestamps: true })
export class ContentBlock {
  @Prop({ required: true, unique: true })
  key: string;

  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  description: string;

  @Prop()
  imagePrompt: string;

  @Prop()
  imageAltText: string;

  @Prop({ type: Object, default: {} })
  payload: Record<string, unknown>;

  @Prop({ default: 'homepage' })
  section: string;

  @Prop({ default: 0 })
  order: number;
}

export const ContentBlockSchema = SchemaFactory.createForClass(ContentBlock);
ContentBlockSchema.index({ section: 1, order: 1 });
