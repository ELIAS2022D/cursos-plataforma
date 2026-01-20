import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ObjectId } from 'mongodb'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Appointment extends Document {
  @Prop({ type: ObjectId, required: true })
  userId: ObjectId

  @Prop({ required: true })
  service: string

  @Prop({ required: true })
  date: string

  @Prop()
  notes?: string
}

export const AppointmentSchema =
  SchemaFactory.createForClass(Appointment)
