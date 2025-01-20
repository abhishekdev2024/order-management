import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "./query-key";
import useToaster from "./useToaster";

const deleteOrder = async (orderId: number) => {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }

  return response.json();
};

const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { err, success } = useToaster();

  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.orders as any);
      success("Order deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Delete error:", error.message);
      err(`Error deleting order: ${error.message}`);
    },
  });

  return mutation;
};

export default useDeleteOrder;
