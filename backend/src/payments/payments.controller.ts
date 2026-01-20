import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from "@nestjs/common"
import { PaymentsService } from "./payments.service"
import { AuthGuard } from "@nestjs/passport"
import type { AuthRequest } from "../auth/auth-request.type"

@UseGuards(AuthGuard("jwt"))
@Controller("payments")
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Post("create")
  async createPayment(
    @Req() req: AuthRequest,
    @Body("courseId") courseId: string,
  ) {
    return this.paymentsService.createPayment(
      courseId,
      req.user.id,
    )
  }
}
