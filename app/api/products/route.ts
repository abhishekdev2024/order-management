import { prisma } from "@/service/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
    return NextResponse.json(
      { message: "Invalid page or pageSize parameter" },
      { status: 400 }
    );
  }

  try {
    const totalProducts = await prisma.products.count();

    const products = await prisma.products.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPages = Math.ceil(totalProducts / pageSize);

    return NextResponse.json({
      data: products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching the products" },
      { status: 500 }
    );
  }
}
