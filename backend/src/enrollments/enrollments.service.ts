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
   * Crea un nuevo enrollment con estado 'pending'
   */
  async create(userId: string, courseId: string) {
    return this.enrollmentModel.create({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(courseId),
      status: 'pending',
      paymentProvider: 'mercadopago',
    });
  }

  /**
   * Marca un enrollment como pagado (status = 'paid')
   */
  async markAsPaid(userId: string, courseId: string) {
    return this.enrollmentModel.findOneAndUpdate(
      {
        userId: new Types.ObjectId(userId),
        courseId: new Types.ObjectId(courseId),
      },
      { status: 'paid' },
      { new: true },
    );
  }

  /**
   * Buscar un enrollment por usuario y curso
   */
  async findByUserAndCourse(userId: string, courseId: string) {
    return this.enrollmentModel.findOne({
      userId: new Types.ObjectId(userId),
      courseId: new Types.ObjectId(courseId),
    });
  }

  /**
   * Obtener todos los enrollments de un usuario
   */
  async findUserEnrollments(userId: string) {
    return this.enrollmentModel.find({
      userId: new Types.ObjectId(userId),
    });
  }
}