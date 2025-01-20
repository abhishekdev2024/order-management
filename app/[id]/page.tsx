// /pages/add-order.tsx
import { useState } from "react";
import useAddOrder from "@/hooks/useAddOrder";

interface Product {
  id: string;
  name: string;
}

const products: Product[] = [
  { id: "1", name: "Product A" },
  { id: "2", name: "Product B" },
  { id: "3", name: "Product C" },
  { id: "4", name: "Product D" },
  // Add more products as needed
];

const AddOrderPage = () => {
  const [productDescription, setProductDescription] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const { mutate: addOrder, error } = useAddOrder();

  const handleCheckboxChange = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    // // Prepare the data for the new order
    // const orderData = {
    //   orderDescription: productDescription,
    //   productIds: selectedProducts,
    // };
    // addOrder(orderData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New Order
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <input
              type="text"
              id="productDescription"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter a description"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Select Products
            </label>
            <div className="space-y-2 mt-2">
              {products.map((product) => (
                <div key={product.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`product-${product.id}`}
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`product-${product.id}`} className="text-sm">
                    {product.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* <button
            type="submit"
            className={`w-full py-2 mt-4 bg-blue-500 text-white rounded-md ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding Order..." : "Add Order"}
          </button> */}

          {error && (
            <div className="mt-2 text-red-500 text-sm text-center">
              {error.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddOrderPage;
