import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EnrollmentDocument = Enrollment & Document;

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({
    type: String,
    enum: ['pending', 'paid', 'cancelled'],
    default: 'pending',
  })
  status: 'pending' | 'paid' | 'cancelled';

  @Prop({ default: 'mercadopago' })
  paymentProvider: string;

  @Prop()
  paymentId?: string;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);