import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";

@UseGuards(AuthGuard("jwt"))
@Controller("payments")
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post("create")
  async createPayment(
    @Req() req: Request,
    @Body("courseId") courseId: string,
  ) {
    const user = req.user as { sub: string };

    return this.paymentsService.createPayment(
      courseId,
      user.sub,
    );
  }
}