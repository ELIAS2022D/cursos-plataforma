import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

if (!baseURL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL no está definida")
}

const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

export default api
