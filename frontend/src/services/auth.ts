import api from "./api";

export type LoginResponse = {
  access_token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}