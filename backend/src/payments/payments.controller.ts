import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async create(
    @Body("courseId") courseId: string,
    @Req() req: any
  ) {
      return this.paymentsService.createPayment(courseId, req.user.id);
    }
}