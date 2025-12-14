import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 'pending' })
  status: 'pending' | 'paid';

  @Prop()
  paymentId: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
