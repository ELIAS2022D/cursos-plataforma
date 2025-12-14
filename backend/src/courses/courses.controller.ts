import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { OrdersService } from '../orders/orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private ordersService: OrdersService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.coursesService.create(body);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.coursesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }

  // 🔒 CONTENIDO PRIVADO
  @UseGuards(JwtAuthGuard)
  @Get(':id/content')
  async getContent(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;

    const hasAccess = await this.ordersService.userHasCourse(userId, id);
    if (!hasAccess) {
      throw new ForbiddenException('No tenés acceso a este curso');
    }

    const course = await this.coursesService.findById(id);
    return { content: course.content };
  }
}
