import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(data: { fullName: string; email: string; password: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.userModel.create({ ...data, password: hashed });
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // ✅ NUEVO: traer cursos del usuario
  async getCourses(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('courses');

    if (!user) throw new NotFoundException('User not found');

    return user.courses;
  }

  // (opcional, para más adelante)
  async addCourse(userId: string, courseId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { courses: courseId } },
      { new: true },
    );
  }
}