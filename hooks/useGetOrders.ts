import { Order } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./query-key";
import { Pagination } from "./type";

const fetchOrders = async (): Promise<Pagination<Order>> => {
  const response = await fetch("/api/orders");

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
};

const useGetOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: fetchOrders,
  });
};

export default useGetOrders;
