export const queryKeys = {
  orders: ["orders"],
  orderDetail: (orderId: number) => ["order", orderId],
  products: ["products"],
};
