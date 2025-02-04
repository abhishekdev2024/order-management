import { Products } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "./query-key";
import { Pagination } from "./type";

const fetchProducts = async (): Promise<Pagination<Products>> => {
  const response = await fetch("/api/products");

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || "Failed to fetch products");
  }

  return response.json();
};

const useGetProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: fetchProducts,
  });
};

export default useGetProducts;
