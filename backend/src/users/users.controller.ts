import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import type { Request } from "express";

@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get("me")
  getMe(@Req() req: Request) {
    return this.usersService.findById(
      req.user!.id,
    );
  }
}
