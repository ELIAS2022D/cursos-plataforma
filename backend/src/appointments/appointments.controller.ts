import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Req,
  UseGuards,
  Logger,
  Param,
} from "@nestjs/common"
import { AppointmentsService } from "./appointments.service"
import { AuthGuard } from "@nestjs/passport"
import type { AuthRequest } from "../auth/auth-request.type"
import { CreateAppointmentDto } from "./dto/create-appointment.dto"
import { ByDateQueryDto } from "./dto/by-date.query.dto"

@Controller("appointments")
export class AppointmentsController {
  private readonly logger = new Logger(AppointmentsController.name)

  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @Get("by-date")
  getByDate(@Query() query: ByDateQueryDto) {
    const { date } = query
    this.logger.log(`GET /appointments/by-date → date=${date}`)
    return this.appointmentsService.getByDate(date)
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  async create(@Req() req: AuthRequest, @Body() dto: CreateAppointmentDto) {
    this.logger.log("POST /appointments")
    this.logger.log(`User ID: ${req.user.id}`)
    this.logger.log(`User Email: ${req.user.email}`)
    this.logger.log(`Service: ${dto.service}`)
    this.logger.log(`Date: ${dto.date}`)
    this.logger.log(`Time: ${dto.time}`)

    return this.appointmentsService.create({
      userId: req.user.id,
      userEmail: req.user.email,
      service: dto.service,
      date: dto.date,
      time: dto.time,
      notes: dto.notes,
    })
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("mine")
  getMine(@Req() req: AuthRequest) {
    return this.appointmentsService.getMine(req.user.id)
  }

  @UseGuards(AuthGuard("jwt"))
  @Post(":id/cancel")
  cancel(@Req() req: AuthRequest, @Param("id") id: string) {
    return this.appointmentsService.cancel(id, req.user.id)
  }
}
