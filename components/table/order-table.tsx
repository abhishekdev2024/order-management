import { Order } from "@prisma/client";
import { useRouter } from "next/navigation";

import Table from "./table";

import useGetOrders from "@/hooks/useGetOrders";
import useDeleteOrder from "@/hooks/useDeleteOrder";
import Loader from "../loader";

const OrderTable = () => {
  const router = useRouter();

  const { data, isLoading, error } = useGetOrders();
  const { mutate: deleteOrder, isPending } = useDeleteOrder();

  const hasOrders = data && data?.data?.length > 0;

  const handleEdit = (orderId: number) => {
    router.push(`/order/${orderId}`);
  };

  const handleDelete = (orderId: number) => {
    deleteOrder(orderId);
  };

  return (
    <>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderColumn>Order ID</Table.HeaderColumn>
            <Table.HeaderColumn>Description</Table.HeaderColumn>
            <Table.HeaderColumn>Date Created</Table.HeaderColumn>
            <Table.HeaderColumn>Actions</Table.HeaderColumn>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {error && !isLoading && (
            <tr>
              <td colSpan={4} className="text-center text-red-500">
                Error:{" "}
                {error instanceof Error
                  ? error.message
                  : "Something went wrong"}
              </td>
            </tr>
          )}

          {!isLoading && !hasOrders && (
            <tr>
              <td colSpan={4} className="text-center text-gray-500">
                No orders available.
              </td>
            </tr>
          )}

          {hasOrders &&
            data?.data.map((order: Order) => (
              <Table.Row key={order.id}>
                <Table.Column>{order.id}</Table.Column>
                <Table.Column>{order.orderDescription}</Table.Column>
                <Table.Column>
                  {new Date(order.createdAt).toDateString()}
                </Table.Column>
                <Table.Column>
                  <button
                    disabled={isPending}
                    onClick={() => handleEdit(order.id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    disabled={isPending}
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg shadow hover:bg-red-600 focus:ring-2 focus:ring-red-300 transition duration-200 ml-2"
                  >
                    Delete
                  </button>
                </Table.Column>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <Loader isVisible={isLoading} />
    </>
  );
};

export default OrderTable;
