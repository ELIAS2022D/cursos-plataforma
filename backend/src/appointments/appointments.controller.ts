import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req, @Body() body) {
    return this.appointmentsService.create(
      req.user.id,
      body,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMine(@Req() req) {
    return this.appointmentsService.findByUser(
      req.user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  cancel(@Req() req, @Param('id') id: string) {
    return this.appointmentsService.cancel(
      req.user.id,
      id,
    );
  }
}
