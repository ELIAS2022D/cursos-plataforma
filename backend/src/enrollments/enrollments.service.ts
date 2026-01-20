import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Enrollment, EnrollmentDocument } from "./schemas/enrollment.schema";

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async findUserEnrollments(userId: string) {
    return this.enrollmentModel
      .find({ user: userId })
      .populate("course")
      .exec();
  }
}
