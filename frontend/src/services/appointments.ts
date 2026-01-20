import api from "./api"

export interface CreateAppointmentPayload {
  service: string
  date: string
  notes?: string
}

export const getAppointmentsByDate = async (date: string) => {
  const res = await api.get(
    `/appointments/by-date?date=${date}`,
  )
  return res.data
}

export const createAppointment = async (
  data: CreateAppointmentPayload,
) => {
  const res = await api.post("/appointments", data)
  return res.data
}

export const getMyAppointments = async () => {
  const res = await api.get("/appointments/mine")
  return res.data
}
