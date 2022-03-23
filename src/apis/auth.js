import { api } from "boot/axios";

export async function login(params) {
  const { data } = await api.post("/auth/login", params);
  return data;
}
