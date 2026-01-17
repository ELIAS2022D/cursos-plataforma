import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from './schemas/appointment.schema';

const APPOINTMENT_DURATION_MINUTES = 60;

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly appointmentModel: Model<Appointment>,
  ) {}

  async create(userId: string, data: any) {
    const startDate = new Date(data.date);
    const endDate = new Date(startDate);
    endDate.setMinutes(
      endDate.getMinutes() + APPOINTMENT_DURATION_MINUTES,
    );

    const overlapping = await this.appointmentModel.findOne({
      status: 'scheduled',
      date: {
        $lt: endDate,
        $gte: startDate,
      },
    });

    if (overlapping) {
      throw new BadRequestException(
        'El horario seleccionado no está disponible',
      );
    }

    return this.appointmentModel.create({
      user: userId,
      service: data.service,
      date: startDate,
      notes: data.notes,
    });
  }

  findByUser(userId: string) {
    return this.appointmentModel
      .find({ user: userId })
      .sort({ date: 1 });
  }

  async cancel(userId: string, appointmentId: string) {
    const appointment = await this.appointmentModel.findOne({
      _id: appointmentId,
      user: userId,
    });

    if (!appointment) {
      throw new NotFoundException('Turno no encontrado');
    }

    appointment.status = 'cancelled';
    return appointment.save();
  }
}
