import axiosClient from "./axiosClient";

export const ordersApi = {
  createOrder: (order) => {
    return axiosClient.post("/api/orders",order);
  },
}