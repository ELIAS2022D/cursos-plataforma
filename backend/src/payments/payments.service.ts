import { Injectable } from '@nestjs/common';
import { Preference, Payment } from 'mercadopago';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from '../enrollments/schemas/enrollment.schema';

const preferenceClient = new Preference({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const paymentClient = new Payment({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Enrollment.name)
    private enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  /**
   * Crear preferencia de pago para un curso
   */
  async createPreference(userId: string, course: any) {
    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: course._id.toString(),
            title: course.title,
            quantity: 1,
            unit_price: course.price,
          },
        ],
        metadata: {
          userId,
          courseId: course._id.toString(),
        },
        notification_url: `${process.env.API_URL}/payments/webhook`,
        back_urls: {
          success: `${process.env.FRONT_URL}/dashboard`,
          failure: `${process.env.FRONT_URL}/payment-error`,
          pending: `${process.env.FRONT_URL}/payment-pending`,
        },
        auto_return: 'approved',
      },
    });

    return {
      init_point: preference.init_point,
    };
  }

  /**
   * Webhook de MercadoPago
   */
  async handleWebhook(body: any) {
    if (body.type !== 'payment') return;

    const payment = await paymentClient.get({
      id: body.data.id,
    });

    if (payment.status !== 'approved') return;

    const { userId, courseId } = payment.metadata;

    // Marcar inscripción como pagada
    await this.enrollmentModel.findOneAndUpdate(
      { userId, courseId },
      { status: 'paid' },
      { upsert: true },
    );
  }

  /**
   * Obtener cursos pagados del usuario
   */
  async findUserEnrollments(userId: string) {
    return this.enrollmentModel
      .find({ userId, status: 'paid' })
      .populate('courseId');
  }
}