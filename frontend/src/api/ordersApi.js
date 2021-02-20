import axiosClient from "./axiosClient";

export const ordersApi = {
  createOrder: (order) => {
    return axiosClient.post("/api/orders", order);
  },
  getOrderDetail: (id) => {
    return axiosClient.get(`/api/orders/${id}`);
  },
  payOrder: (orderId, paymentResult) => {
    return axiosClient.put(`/api/orders/${orderId}/pay`, paymentResult);
  },
  listMyOrders: () => {
    return axiosClient.get("/api/orders/myorders");
  },
  listOrders: () => {
    return axiosClient.get("/api/orders");
  },
  deliverOrder: (id) => {
    return axiosClient.put(`api/orders/${id}/deliver`);
  },
};
