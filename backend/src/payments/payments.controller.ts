import { Controller, Post, Body, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.paymentsService.createPreference(
      body.userId,
      body.course,
    );
  }

  @Post('webhook')
  webhook(@Req() req: any) {
    return this.paymentsService.handleWebhook(req.body);
  }
}