import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "./query-key";
import useToaster from "./useToaster";

type OrderData = {
  description: string;
  productIds: number[];
} & { orderId?: number };

const updateOrder = async (orderData: OrderData) => {
  const { orderId, ...rest } = orderData;
  if (!orderId) throw new Error("Order ID is required");
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Failed to update order");
  }

  return response.json();
};

const addOrder = async (orderData: OrderData) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Failed to add order");
  }

  return response.json();
};

type Mode = "add" | "update";

const useOrderMutation = (mode: Mode) => {
  const queryClient = useQueryClient();
  const { err, success } = useToaster();

  const mutationFn = mode === "add" ? addOrder : updateOrder;

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.orders as any);
      const message =
        mode === "add"
          ? "Order added successfully"
          : "Order updated successfully";
      console.log(message, data);
      success(message);
    },
    onError: (error: any) => {
      const message =
        mode === "add"
          ? `Error adding order: ${error.message}`
          : `Error updating order: ${error.message}`;
      console.error(message);
      err(message);
    },
  });
};

export default useOrderMutation;
