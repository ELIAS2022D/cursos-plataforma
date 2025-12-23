import {
  Controller,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  /**
   * GET /users/me/courses
   */
  @Get("me/courses")
  async getMyCourses(@Req() req: Request) {
    const user = req.user as { sub: string };

    return this.usersService.getMyCourses(user.sub);
  }
}