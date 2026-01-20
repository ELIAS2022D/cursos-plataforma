"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  getAppointmentsByDate,
  createAppointment,
  Appointment,
} from "@/services/appointments"

const HOURS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]

export default function BookAppointment() {
  const [date, setDate] = useState("")
  const [taken, setTaken] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Servicio real (podés reemplazar por un select más adelante)
  const [service, setService] = useState("Turno web")

  useEffect(() => {
    if (!date) return

    getAppointmentsByDate(date)
      .then((data: Appointment[]) => {
        setTaken(data.map((a) => a.time))
      })
      .catch((error: any) => {
        console.error("Error cargando turnos por fecha:", error)
        alert("No se pudieron cargar los turnos. Intentá de nuevo.")
      })
  }, [date])

  const handleBook = async (time: string) => {
    try {
      setLoading(true)

      await createAppointment({
        date,
        time,
        service,
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

      <input
        type="text"
        className="border p-2 rounded w-full"
        value={service}
        onChange={(e) => setService(e.target.value)}
        placeholder="Servicio (ej: Reparación notebook)"
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
