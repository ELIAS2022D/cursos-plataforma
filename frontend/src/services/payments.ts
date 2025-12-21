import api from "./api"

export const purchaseCourse = async (courseId: string) => {
  const res = await api.post("/payments/create", {
    courseId,
  })

  return res.data
}