import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Enrollment, EnrollmentDocument } from './schemas/enrollment.schema';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  /**
   * Crear inscripción (cuando el usuario intenta comprar)
   */
  async createEnrollment(userId: string, courseId: string) {
    return this.enrollmentModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        courseId: new Types.ObjectId(courseId),
      },
      {
        status: 'pending',
      },
      { upsert: true, new: true },
    );
  }

  /**
   * Marcar inscripción como pagada (webhook MP)
   */
  async markAsPaid(userId: string, courseId: string) {
    return this.enrollmentModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        courseId: new Types.ObjectId(courseId),
      },
      {
        status: 'paid',
      },
      { new: true },
    );
  }

  /**
   * Obtener cursos pagos del usuario
   */
  async findUserEnrollments(userId: string) {
    return this.enrollmentModel
      .find({
        userId: new Types.ObjectId(userId),
        status: 'paid',
      })
      .populate('courseId');
  }
}