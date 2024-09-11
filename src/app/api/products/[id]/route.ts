import { TProduct, ZProductUpdate } from "@/types/product";
import { NextResponse } from "next/server";

async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const products = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => data as TProduct);
  return NextResponse.json(products);
}

async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const reqBody = await req.json();
  const payload = ZProductUpdate.safeParse(reqBody);
  if (!payload.success) {
    return NextResponse.json(
      {
        error: payload.error.message,
      },
      { status: 400 }
    );
  }
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload.data),
  })
    .then((res) => res.json())
    .then((data) => data as { id: number });
  return NextResponse.json({ ...payload.data, id: response.id });
}

async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => data as { id: number });
  return NextResponse.json({ id: response.id });
}

export { GET, PUT, DELETE };
