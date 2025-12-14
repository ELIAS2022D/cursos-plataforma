import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  create(data: any) {
    return this.courseModel.create(data);
  }

  findAll() {
    return this.courseModel.find();
  }

  async findById(id: string) {
    const course = await this.courseModel.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  update(id: string, data: any) {
    return this.courseModel.findByIdAndUpdate(id, data, { new: true });
  }

  remove(id: string) {
    return this.courseModel.findByIdAndDelete(id);
  }
}
