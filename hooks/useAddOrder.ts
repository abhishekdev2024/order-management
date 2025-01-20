import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "./query-key";
import useToaster from "./useToaster";

interface OrderData {
  orderDescription: string;
  productIds: number[];
}

const addOrder = async (orderData: OrderData) => {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error("Failed to add order");
  }

  return response.json();
};

const useAddOrder = () => {
  const queryClient = useQueryClient();
  const { err, success } = useToaster();
  return useMutation({
    mutationFn: addOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries(queryKeys.orders as any);
      console.log("Order added:", data);
      success("Order added successfully");
    },
    onError: (error: any) => {
      // Handle error (e.g., show an error message to the user)
      console.error("Error adding order:", error);
      err(`Error adding order: ${error.message}`);
    },
  });
};

export default useAddOrder;
