import { api } from "boot/axios";

export async function fetchOrders(params) {
  const { data } = await api.get("/orders", { params });
  return data;
}
