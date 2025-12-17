import api from "@/services/api"

export async function getCourses() {
  const res = await api.get("/courses")
  return res.data
}