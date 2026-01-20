import { Injectable, Logger, BadRequestException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { Appointment } from "./schemas/appointment.schema"

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name)

  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<Appointment>,
  ) {}

  async create(data: {
    userId: string
    service: string
    date: string
    notes?: string
  }) {
    this.logger.log("=== CREATE APPOINTMENT ===")
    this.logger.log(`UserId: ${data.userId}`)
    this.logger.log(`Service: ${data.service}`)
    this.logger.log(`Date received: ${data.date}`)

    /**
     * VALIDACIÓN DE DISPONIBILIDAD
     * (misma fecha, mismo servicio)
     */
    const existing = await this.appointmentModel.findOne({
      date: data.date,
      service: data.service,
    })

    this.logger.log(
      `Existing appointment: ${existing ? "FOUND" : "NOT FOUND"}`,
    )

    if (existing) {
      this.logger.warn(
        `Turno NO disponible → date=${data.date} service=${data.service}`,
      )
      throw new BadRequestException("Ese turno ya no está disponible")
    }

    const created = await this.appointmentModel.create({
      ...data,
      userId: new Types.ObjectId(data.userId),
    })

    this.logger.log(`Appointment CREATED → id=${created._id}`)

    return created
  }

  async getByDate(date: string) {
    this.logger.log(`GET BY DATE → date=${date}`)

    const results = await this.appointmentModel.find(
      { date },
      { time: 1, _id: 0 },
    )

    this.logger.log(
      `Appointments found for ${date}: ${results.length}`,
    )

    return results
  }

  async getMine(userId: string) {
    this.logger.log(`GET MINE → userId=${userId}`)

    return this.appointmentModel.find({
      userId: new Types.ObjectId(userId),
    })
  }
}
