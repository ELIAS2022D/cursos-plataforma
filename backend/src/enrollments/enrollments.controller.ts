import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { EnrollmentsService } from "./enrollments.service";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";

@UseGuards(AuthGuard("jwt"))
@Controller("enrollments")
export class EnrollmentsController {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Get("my")
  async getMyEnrollments(@Req() req: Request) {
    // req.user viene del JwtStrategy
    const user = req.user as { id: string; email: string };

    return this.enrollmentsService.findUserEnrollments(
      user.id,
    );
  }
}
