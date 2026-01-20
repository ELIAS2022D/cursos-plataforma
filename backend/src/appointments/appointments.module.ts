import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { AppointmentsController } from "./appointments.controller"
import { AppointmentsService } from "./appointments.service"
import { Appointment, AppointmentSchema } from "./schemas/appointment.schema"
import { NotificationsModule } from "../notifications/notifications.module"

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    NotificationsModule, // ✅ necesario para poder inyectar EmailService
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
