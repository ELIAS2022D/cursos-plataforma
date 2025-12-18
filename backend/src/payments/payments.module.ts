import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { Enrollment, EnrollmentSchema } from '../enrollments/schemas/enrollment.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}