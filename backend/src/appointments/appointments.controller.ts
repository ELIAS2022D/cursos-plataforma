import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
  Logger,
} from "@nestjs/common"
import { AppointmentsService } from "./appointments.service"
import { AuthGuard } from "@nestjs/passport"
import type { AuthRequest } from "../auth/auth-request.type"

@Controller("appointments")
export class AppointmentsController {
  private readonly logger = new Logger(AppointmentsController.name)

  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  // 🔓 PUBLICO
  @Get("by-date")
  getByDate(@Query("date") date: string) {
    this.logger.log(`GET /appointments/by-date → date=${date}`)
    return this.appointmentsService.getByDate(date)
  }

  // 🔐 PRIVADO
  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(
    @Req() req: AuthRequest,
    @Body("service") service: string,
    @Body("date") date: string,
    @Body("notes") notes?: string,
  ) {
    this.logger.log("POST /appointments")
    this.logger.log(`User ID: ${req.user.id}`)
    this.logger.log(`Service: ${service}`)
    this.logger.log(`Date: ${date}`)
    this.logger.log(`Notes: ${notes ?? "—"}`)

    try {
      const result = await this.appointmentsService.create({
        userId: req.user.id,
        service,
        date,
        notes,
      })

      this.logger.log("Turno creado correctamente")
      return result
    } catch (error) {
      this.logger.error(
        "Error al crear turno",
        error?.stack || error,
      )
      throw error
    }
  }

  // 🔐 PRIVADO
  @UseGuards(AuthGuard("jwt"))
  @Get("mine")
  getMine(@Req() req: AuthRequest) {
    this.logger.log(`GET /appointments/mine → userId=${req.user.id}`)
    return this.appointmentsService.getMine(req.user.id)
  }
}
