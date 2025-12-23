import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  Enrollment,
  EnrollmentDocument,
} from "./schemas/enrollment.schema";

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  /**
   * Crear enrollment (pending / paid)
   */
  async createEnrollment(
    userId: string,
    courseId: string,
    status: "pending" | "paid" = "pending",
  ) {
    return this.enrollmentModel.create({
      user: new Types.ObjectId(userId),
      course: new Types.ObjectId(courseId),
      status,
      paymentProvider: "mercadopago",
    });
  }

  /**
   * ✅ ESTE ES EL MÉTODO QUE FALTABA
   * Trae los enrollments del usuario (para dashboard)
   */
  async findUserEnrollments(userId: string) {
    return this.enrollmentModel
      .find({
        user: new Types.ObjectId(userId),
        status: "paid",
      })
      .populate("course");
  }
}