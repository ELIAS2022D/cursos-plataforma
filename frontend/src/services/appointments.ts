import api from "./api"

export interface Appointment {
  time: string
}

export interface CreateAppointmentPayload {
  service: string
  date: string
  time: string
  notes?: string
}

export const getAppointmentsByDate = async (date: string) => {
  const res = await api.get(`/appointments/by-date?date=${date}`)
  return res.data as Appointment[]
}

export const createAppointment = async (data: CreateAppointmentPayload) => {
  const res = await api.post("/appointments", data)
  return res.data
}

export const getMyAppointments = async () => {
  const res = await api.get("/appointments/mine")
  return res.data
}

export const cancelAppointment = async (id: string) => {
  const res = await api.post(`/appointments/${id}/cancel`)
  return res.data
}
