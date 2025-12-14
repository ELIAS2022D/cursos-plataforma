import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('confirm')
  confirm(@Body() body: any) {
    return this.paymentsService.confirmPayment(
      body.orderId,
      body.paymentId,
    );
  }
}
