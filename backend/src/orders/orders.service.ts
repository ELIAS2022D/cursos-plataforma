import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  createOrder(userId: string, courseId: string, price: number) {
    return this.orderModel.create({
      userId,
      courseId,
      price,
      status: 'pending',
    });
  }

  async markAsPaid(orderId: string, paymentId: string) {
    return this.orderModel.findByIdAndUpdate(orderId, {
      status: 'paid',
      paymentId,
    });
  }

  async userHasCourse(userId: string, courseId: string): Promise<boolean> {
    const order = await this.orderModel.findOne({
      userId,
      courseId,
      status: 'paid',
    });
    return !!order;
  }

  getMyCourses(userId: string) {
    return this.orderModel.find({ userId, status: 'paid' });
  }
}
