import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema({ timestamps: true })
export class Appointment {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId

  // Fecha en formato YYYY-MM-DD
  @Prop({ required: true })
  date: string

  // Hora en formato HH:mm (ej: "09:00")
  @Prop({ required: true })
  time: string

  // Servicio real (ej: "Reparación notebook", "Consulta", etc.)
  @Prop({ required: true })
  service: string

  @Prop()
  notes?: string

  @Prop({ default: "booked" })
  status: "booked" | "cancelled"
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment)

// Índice único para evitar doble reserva del mismo slot
AppointmentSchema.index({ date: 1, time: 1 }, { unique: true })
