import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('buy')
  buy(@Body() body: any, @Req() req) {
    return this.ordersService.createOrder(
      req.user.userId,
      body.courseId,
      body.price,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-courses')
  myCourses(@Req() req) {
    return this.ordersService.getMyCourses(req.user.userId);
  }
}
