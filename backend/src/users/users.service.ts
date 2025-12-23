import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./schemas/user.schema";
import {
  Enrollment,
  EnrollmentDocument,
} from "../enrollments/schemas/enrollment.schema";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async create(data: {
    fullName: string;
    email: string;
    password: string;
  }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.userModel.create({ ...data, password: hashed });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  /**
   * ✅ Cursos comprados (PAID)
   * Alimenta el Dashboard
   */
  async getMyCourses(userId: string) {
    const userExists = await this.userModel.exists({
      _id: new Types.ObjectId(userId),
    });

    if (!userExists) {
      throw new NotFoundException("User not found");
    }

    const enrollments = await this.enrollmentModel
      .find({
        user: new Types.ObjectId(userId),
        status: "paid",
      })
      .populate("course");

    // devolvemos SOLO cursos
    return enrollments.map((e) => e.course);
  }
}