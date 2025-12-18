import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('enrollments')
@UseGuards(AuthGuard('jwt'))
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Get('me')
  getMyEnrollments(@Req() req) {
    return this.enrollmentsService.findUserEnrollments(req.user.sub);
  }
}