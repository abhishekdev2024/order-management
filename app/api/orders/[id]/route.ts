import { prisma } from "@/service/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const orderId = parseInt(id, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching the order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const { description, date } = await request.json();

    // // Find the order and update
    // const orderIndex = orders.findIndex((order) => order.id === parseInt(id));
    // if (orderIndex === -1) {
    //   return NextResponse.json({ message: "Order not found" }, { status: 404 });
    // }

    // // Update the order
    // orders[orderIndex] = { ...orders[orderIndex], description, date };

    // return NextResponse.json(orders[orderIndex]);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const orderId = parseInt(params.id, 10);

  if (isNaN(orderId)) {
    return NextResponse.json({ message: "Invalid order ID" }, { status: 400 });
  }

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    return NextResponse.json(
      { message: `Order ${deletedOrder.id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while deleting the order:", error);
    if (error instanceof Error) {
      if (error.message.includes("P2025")) {
        return NextResponse.json(
          { message: "Order not found" },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "Something went wrong while deleting the order" },
      { status: 500 }
    );
  }
}
