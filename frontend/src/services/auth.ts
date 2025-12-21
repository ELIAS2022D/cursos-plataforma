import api from "./api"

interface LoginPayload {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
}

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", payload)
  return res.data
}