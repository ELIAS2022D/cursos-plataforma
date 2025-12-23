import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Course, CourseDocument } from "../courses/schemas/course.schema";
import {
  Enrollment,
  EnrollmentDocument,
} from "../enrollments/schemas/enrollment.schema";
import { MercadoPagoConfig, Preference } from "mercadopago";

@Injectable()
export class PaymentsService {
  private preferenceClient: Preference;

  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,

    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
  ) {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("MERCADOPAGO_ACCESS_TOKEN no definido");
    }

    const mpConfig = new MercadoPagoConfig({ accessToken });
    this.preferenceClient = new Preference(mpConfig);
  }

  async createPayment(courseId: string, userId: string) {
    const course = await this.courseModel.findById(courseId);
    if (!course) {
      throw new NotFoundException("Curso no encontrado");
    }

    try {
      // ✅ Creamos enrollment PENDING
      await this.enrollmentModel.create({
        user: new Types.ObjectId(userId),
        course: new Types.ObjectId(courseId),
        status: "pending",
        paymentProvider: "mercadopago",
      });

      const preference = await this.preferenceClient.create({
        body: {
          items: [
            {
              id: course._id.toString(),
              title: course.title,
              quantity: 1,
              unit_price: Number(course.price),
              currency_id: "ARS",
            },
          ],
          back_urls: {
            success: "http://localhost:3000/payments/success",
            failure: "http://localhost:3000/payments/failure",
            pending: "http://localhost:3000/payments/pending",
          },
          metadata: {
            courseId: course._id.toString(),
            userId,
          },
        },
      });

      if (!preference.init_point) {
        throw new Error("Mercado Pago no devolvió init_point");
      }

      return { init_point: preference.init_point };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        "Error creando el pago",
      );
    }
  }
}