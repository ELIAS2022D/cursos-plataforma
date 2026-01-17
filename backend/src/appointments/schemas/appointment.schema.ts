import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  service: string;

  @Prop({ required: true })
  date: Date;

  @Prop({
    default: 'scheduled',
    enum: ['scheduled', 'cancelled', 'completed'],
  })
  status: string;

  @Prop()
  notes?: string;
}

export const AppointmentSchema =
  SchemaFactory.createForClass(Appointment);
