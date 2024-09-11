import { TProduct, TProductCreate } from "@/types/product";

export const getAllProductsRequest = async () => {
  return fetch("/api/products")
    .then((res) => res.json())
    .then((data) => data as TProduct[]);
};

export const createProductRequest = async (payload: TProductCreate) => {
  return fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => data as TProduct);
};
