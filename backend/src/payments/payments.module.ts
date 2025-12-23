import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";
import { Course, CourseSchema } from "../courses/schemas/course.schema";
import {
  Enrollment,
  EnrollmentSchema,
} from "../enrollments/schemas/enrollment.schema";
import { EnrollmentsModule } from "../enrollments/enrollments.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
    EnrollmentsModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}