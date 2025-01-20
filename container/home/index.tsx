"use client";

import Link from "next/link";

import Header from "@/components/header";
import OrderTable from "@/components/table/order-table";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto border border-red-600">
        <div className="flex items-center justify-end w-full gap-3 px-6">
          <div className="relative w-[100px]">
            <input
              type="text"
              placeholder="Search orders..."
              className="ml-auto py-2 pl-4 pr-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500"
            />
            {/* <span className="h-3 w-3 absolute top-1/2 right-3 transform ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16l-4-4m0 0l4-4m-4 4h16"
                />
              </svg>
            </span> */}
          </div>
          <Link
            href="/order"
            className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
          >
            New Order
          </Link>
        </div>

        <div className="overflow-x-auto flex-1 border border-black">
          <OrderTable />
        </div>
      </div>
    </>
  );
};

export default HomePage;
