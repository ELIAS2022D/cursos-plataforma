import api from "@/services/api"

export const getCourses = async () => {
  const res = await api.get("/courses")
  return res.data
}

export const getMyCourses = async () => {
  const res = await api.get("/users/me/courses")
  return res.data
}