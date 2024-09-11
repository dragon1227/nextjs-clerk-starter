import { TProduct, ZProductCreate } from "@/types/product";
import { NextResponse } from "next/server";

async function GET() {
  const products = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => data as TProduct[]);
  return NextResponse.json(products);
}

async function POST(req: Request) {
  const reqBody = await req.json();
  const payload = ZProductCreate.safeParse(reqBody);
  if (!payload.success) {
    return NextResponse.json(
      {
        error: payload.error.message,
      },
      { status: 400 }
    );
  }
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(payload.data),
  })
    .then((res) => res.json())
    .then((data) => data as { id: number });
  return NextResponse.json({ ...payload.data, id: response.id });
}

export { GET, POST };
