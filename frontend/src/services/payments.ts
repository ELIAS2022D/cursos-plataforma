import api from "@/services/api"

export async function purchaseCourse(courseId: string) {
  const res = await api.post("/payments/purchase", {
    courseId,
  })

  return res.data
}