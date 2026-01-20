import BookAppointment from "@/components/appointments/bookAppointment"

export default function TurnosPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Reservar turno</h1>
        <p className="text-muted-foreground">
          Elegí una fecha y un horario disponible
        </p>
      </header>

      <BookAppointment />
    </div>
  )
}
