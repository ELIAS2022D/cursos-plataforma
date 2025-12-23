import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "../../users/schemas/user.schema";
import { Course } from "../../courses/schemas/course.schema";

@Schema({ timestamps: true })
export class Enrollment {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Course.name,
    required: true,
  })
  course: Types.ObjectId;

  @Prop({
    default: "pending",
    enum: ["pending", "paid", "cancelled"],
  })
  status: "pending" | "paid" | "cancelled";

  // ✅ NUEVO – para saber quién procesó el pago
  @Prop({
    default: "mercadopago",
  })
  paymentProvider: "mercadopago";
}

export type EnrollmentDocument = Enrollment & Document;
export const EnrollmentSchema =
  SchemaFactory.createForClass(Enrollment);