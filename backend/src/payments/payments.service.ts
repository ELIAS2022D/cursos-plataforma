import { Injectable } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';

@Injectable()
export class PaymentsService {
  constructor(private ordersService: OrdersService) {}

  async confirmPayment(orderId: string, paymentId: string) {
    return this.ordersService.markAsPaid(orderId, paymentId);
  }
}
