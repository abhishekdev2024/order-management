import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { createOrder, updateOrder, getOrderById } from "@/lib/api"; // Assume these API methods are defined

interface OrderFormProps {
  inEditMode?: boolean;
}

const OrderForm = ({ inEditMode }: OrderFormProps) => {
  const router = useRouter();

  const [description, setDescription] = useState("");
  const [productIds, setProductIds] = useState([]);
  const { id } = router.query; // Use query parameter to check if editing

  //   // Fetch the order if in edit mode
  //   const {
  //     data: order,
  //     isLoading,
  //     isError,
  //   } = useQuery(["order", id], () => getOrderById(id as string), {
  //     enabled: !!id, // Only fetch if id is available (edit case)
  //     onSuccess: (data) => {
  //       if (data) {
  //         setDescription(data.description);
  //         setProductIds(data.productIds);
  //       }
  //     },
  //   });

  //   const mutation = useMutation(initialData ? updateOrder : createOrder, {
  //     onSuccess: () => {
  //       router.push("/orders"); // Redirect to orders list after success
  //     },
  //   });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = { description, productIds };

    // if (initialData) {
    //   // Edit the existing order
    //   mutation.mutate({ ...orderData, id: initialData.id });
    // } else {
    //   // Create a new order
    //   mutation.mutate(orderData);
    // }
  };

  //   if (isLoading) return <div>Loading...</div>;
  //   if (isError) return <div>Error loading order</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Order</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">
            Order Description
          </label>
          {/* <input
            type="text"
            value={orderDescription}
            onChange={(e) => setOrderDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter order description"
            required
          /> */}
        </div>

        <div>
          <label className="block text-lg font-medium mb-2">
            Select Products
          </label>
          <div className="space-y-2">
            {/* {products.map((product) => (
              <div key={product.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`product-${product.id}`}
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                  className="h-5 w-5"
                />
                <label htmlFor={`product-${product.id}`} className="text-lg">
                  {product.productName} - {product.productDescription}
                </label>
              </div>
            ))} */}
          </div>
        </div>

        <div className="flex space-x-4">
          {/* <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Submit
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
