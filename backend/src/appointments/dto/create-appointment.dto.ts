import { IsOptional, IsString, Matches, MaxLength } from "class-validator"

export class CreateAppointmentDto {
  @IsString()
  @MaxLength(80)
  service: string

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date debe tener formato YYYY-MM-DD",
  })
  date: string

  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, {
    message: "time debe tener formato HH:mm (24h)",
  })
  time: string

  @IsOptional()
  @IsString()
  @MaxLength(400)
  notes?: string
}
