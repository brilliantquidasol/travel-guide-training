import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConciergeStarterDocument = HydratedDocument<ConciergeStarter>;

@Schema({ _id: false })
export class ConciergeMessage {
  @Prop()
  role: 'user' | 'assistant';
  @Prop()
  content: string;
}
const ConciergeMessageSchema = SchemaFactory.createForClass(ConciergeMessage);

@Schema({ timestamps: true })
export class ConciergeStarter {
  @Prop({ required: true })
  label: string;

  @Prop()
  prompt: string;

  @Prop({ default: 'starter' })
  type: 'starter' | 'conversation' | 'escalation';

  @Prop({ type: [ConciergeMessageSchema], default: [] })
  messages: ConciergeMessage[];

  @Prop({ default: 0 })
  order: number;
}

export const ConciergeStarterSchema = SchemaFactory.createForClass(ConciergeStarter);
