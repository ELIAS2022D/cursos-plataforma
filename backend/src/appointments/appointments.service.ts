import { Injectable, Logger, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { Appointment } from "./schemas/appointment.schema"
import { EmailService } from "../notifications/email.service"

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name)

  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<Appointment>,
    private readonly emailService: EmailService,
  ) {}

  private parseLocalDateTime(date: string, time: string) {
    const [y, m, d] = date.split("-").map(Number)
    const [hh, mm] = time.split(":").map(Number)
    return new Date(y, m - 1, d, hh, mm, 0, 0) // local time
  }

  async create(data: {
    userId: string
    userEmail: string
    date: string
    time: string
    service: string
    notes?: string
  }) {
    this.logger.log("=== CREATE APPOINTMENT ===")
    this.logger.log(`UserId: ${data.userId}`)
    this.logger.log(`UserEmail: ${data.userEmail}`)
    this.logger.log(`Date: ${data.date}`)
    this.logger.log(`Time: ${data.time}`)
    this.logger.log(`Service: ${data.service}`)

    // ✅ Bloqueo de fechas/horas pasadas
    const slot = this.parseLocalDateTime(data.date, data.time)
    const now = new Date()

    if (Number.isNaN(slot.getTime())) {
      throw new BadRequestException("Fecha u hora inválida")
    }

    if (slot.getTime() < now.getTime()) {
      throw new BadRequestException("No se pueden reservar turnos en el pasado")
    }

    // ✅ Validación de disponibilidad por slot
    const existing = await this.appointmentModel.findOne({
      date: data.date,
      time: data.time,
      status: { $ne: "cancelled" },
    })

    if (existing) {
      throw new BadRequestException("Ese turno ya no está disponible")
    }

    const created = await this.appointmentModel.create({
      userId: new Types.ObjectId(data.userId),
      date: data.date,
      time: data.time,
      service: data.service,
      notes: data.notes,
      status: "booked",
    })

    // ✅ Email de confirmación (no rompe la reserva si falla)
    await this.emailService.sendAppointmentConfirmation({
      to: data.userEmail,
      date: data.date,
      time: data.time,
      service: data.service,
      notes: data.notes,
    })

    return created
  }

  async getByDate(date: string) {
    const results = await this.appointmentModel.find(
      { date, status: { $ne: "cancelled" } },
      { time: 1, _id: 0 },
    )
    return results
  }

  async getMine(userId: string) {
    return this.appointmentModel.find({
      userId: new Types.ObjectId(userId),
      status: { $ne: "cancelled" },
    })
  }

  async cancel(id: string, userId: string) {
    const updated = await this.appointmentModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) },
      { status: "cancelled" },
      { new: true },
    )

    if (!updated) {
      throw new BadRequestException("No se pudo cancelar el turno")
    }

    return updated
  }
}
