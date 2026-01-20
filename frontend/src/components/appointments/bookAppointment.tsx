"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { getAppointmentsByDate, createAppointment } from "@/services/appointments"

type AppointmentDTO = {
  time?: string
  date?: string
  service?: string
}

const HOURS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

export default function BookAppointment() {
  const [date, setDate] = useState("")
  const [taken, setTaken] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!date) return

    getAppointmentsByDate(date)
      .then((data: AppointmentDTO[]) => {
        // Preferimos `time` si viene del backend
        const hoursFromTime = data
          .map((a) => a.time)
          .filter((t): t is string => typeof t === "string" && t.length > 0)

        if (hoursFromTime.length > 0) {
          setTaken(hoursFromTime)
          return
        }

        // Si el backend devuelve `service` como horario, lo usamos
        const hoursFromService = data
          .map((a) => a.service)
          .filter((t): t is string => typeof t === "string" && t.length > 0)

        if (hoursFromService.length > 0) {
          setTaken(hoursFromService)
          return
        }

        // Fallback por si devuelve `date` como datetime
        const hoursFromDate = data
          .map((a) => a.date)
          .filter((d): d is string => typeof d === "string" && d.length > 0)
          .map((d) => new Date(d).toISOString().substring(11, 16))

        setTaken(hoursFromDate)
      })
      .catch((error: any) => {
        console.error("Error cargando turnos por fecha:", error)
        alert("No se pudieron cargar los turnos. Intentá de nuevo.")
      })
  }, [date])

  const handleBook = async (time: string) => {
    try {
      setLoading(true)

      // ✅ El backend espera: { service, date, notes? }
      // Usamos `service` como el slot horario (por ahora)
      await createAppointment({
        date,
        service: time,
      })

      setTaken((prev) => [...prev, time])
      alert("Turno reservado")
    } catch (error: any) {
      console.error("Error reservando turno:", error)

      if (axios.isAxiosError(error)) {
        const status = error.response?.status
        const message = error.response?.data?.message

        if (status === 400) {
          alert(typeof message === "string" ? message : "No se pudo reservar el turno.")
          return
        }

        if (status === 401) {
          alert("Tenés que iniciar sesión para reservar un turno.")
          return
        }

        if (status === 403) {
          alert("Tu sesión expiró. Volvé a iniciar sesión.")
          return
        }

        alert("Error inesperado al reservar. Intentá nuevamente.")
        return
      }

      alert("Error inesperado al reservar. Intentá nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {date && (
        <div className="grid grid-cols-3 gap-4">
          {HOURS.map((time) => {
            const disabled = taken.includes(time)

            return (
              <button
                key={time}
                disabled={disabled || loading}
                onClick={() => handleBook(time)}
                className={`p-3 rounded border ${
                  disabled ? "bg-gray-200 cursor-not-allowed" : "bg-black text-white"
                }`}
              >
                {time}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
