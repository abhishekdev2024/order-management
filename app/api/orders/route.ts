import { prisma } from "@/service/database";
import { faker } from "@faker-js/faker";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const orders = await prisma.order.findMany({
      skip: skip,
      take: take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalOrders = await prisma.order.count();

    const totalPages = Math.ceil(totalOrders / pageSize);

    return NextResponse.json({
      data: orders,
      pagination: {
        totalOrders,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { description, date } = await request.json();

    // // Validation
    // if (!description || !date) {
    //   return NextResponse.json(
    //     { message: "Description and date are required" },
    //     { status: 400 }
    //   );
    // }

    // // Create a new order
    // const newOrder = {
    //   id: orders.length + 1,
    //   description,
    //   date,
    // };

    // // Add to orders array
    // orders.push(newOrder);
    // const products: Omit<Products, "id">[] = [];
    // for (let i = 0; i < 20; i++) {
    //   products.push({
    //     productDescription: faker.commerce.productDescription(),
    //     productName: faker.commerce.productName(),
    //   });
    // }

    // await prisma.products.createMany({
    //   data: products,
    // });

    return NextResponse.json(
      { message: "Order created successfully" },
      { status: 201 }
    ); // Return created order
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 }
    );
  }
}
