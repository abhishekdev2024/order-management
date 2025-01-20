"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useGetProducts from "@/hooks/useGetProducts";
import useAddOrder from "@/hooks/useOrderMutation";
import useToaster from "@/hooks/useToaster";

interface OrderFormProps {
  inEditMode?: boolean;
}

const OrderForm = ({ inEditMode }: OrderFormProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { warning } = useToaster();
  const { data: productsData } = useGetProducts();
  const [description, setDescription] = useState("");
  const [productIds, setProductIds] = useState<number[]>([]);

  const { mutateAsync: addOrder, isPending: addPending } = useAddOrder("add");

  const { mutateAsync: updateOrder, isPending: updatePending } =
    useAddOrder("update");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      warning("Order description is required.");
      return;
    }

    if (productIds.length === 0) {
      warning("Please select at least one product.");
      return;
    }

    const orderData = { description, productIds };
    console.log(orderData);
    if (inEditMode) {
      // updateOrder(orderData);
      console.log("EDIT MDOE", pathName, orderData);
    } else {
      await addOrder(orderData);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleCheckboxChange = (productId: number) => {
    setProductIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const products = productsData?.data || [];

  // if (isLoading) return <p>Loading products...</p>;
  // if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {inEditMode ? "Edit Order" : "Create Order"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Order Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-3 focus:ring focus:ring-blue-200 focus:outline-none"
            placeholder="Enter order description"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Products
          </label>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-3">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    id={`product-${product.id}`}
                    className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-200"
                    checked={productIds.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                  />
                  <label
                    htmlFor={`product-${product.id}`}
                    className="text-gray-700"
                  >
                    <span className="font-medium">{product.productName}</span>
                    <br />
                    <span className="text-sm text-gray-500">
                      {product.productDescription}
                    </span>
                  </label>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No products available. Please check back later.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 focus:ring focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
