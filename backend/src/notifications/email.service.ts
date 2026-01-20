import { Injectable, Logger } from "@nestjs/common"
import nodemailer from "nodemailer"

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)

  private createTransporter() {
    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASSWORD

    if (!user || !pass) {
      throw new Error("Faltan GMAIL_USER o GMAIL_APP_PASSWORD en el .env")
    }

    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    })
  }

  async sendAppointmentConfirmation(params: {
    to: string
    date: string
    time: string
    service: string
    notes?: string
  }) {
    const from = process.env.EMAIL_FROM || process.env.GMAIL_USER
    const subject = `Confirmación de turno - ${params.date} ${params.time}`

    const text =
      `Turno confirmado\n\n` +
      `Fecha: ${params.date}\n` +
      `Hora: ${params.time}\n` +
      `Servicio: ${params.service}\n` +
      (params.notes ? `Notas: ${params.notes}\n` : "") +
      `\nGracias.`

    const html =
      `<h2>Turno confirmado</h2>` +
      `<p><b>Fecha:</b> ${params.date}</p>` +
      `<p><b>Hora:</b> ${params.time}</p>` +
      `<p><b>Servicio:</b> ${params.service}</p>` +
      (params.notes ? `<p><b>Notas:</b> ${params.notes}</p>` : "") +
      `<p>Gracias.</p>`

    try {
      const transporter = this.createTransporter()
      await transporter.sendMail({
        from,
        to: params.to,
        subject,
        text,
        html,
      })

      this.logger.log(`Email de confirmación enviado a ${params.to}`)
    } catch (err: any) {
      // No rompemos la reserva si falla el mail
      this.logger.error("Error enviando email", err?.stack || err)
    }
  }
}
