"use client";

import ProductItemComponent, {
  ProductItemSkeletonComponent,
} from "@/components/common/product/ProductItem";
import { Button } from "@/components/ui/button";
import { useGetProducts } from "@/hooks/use-product";
import { PlusIcon, RefreshCwIcon } from "lucide-react";
import Link from "next/link";

export default function ProductsHomePage() {
  const { data: products, error, isPending, refetch } = useGetProducts();
  return (
    <div className="container mx-auto relative">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">Products</div>
        <Link passHref href="/products/create">
          <Button size="icon" className="size-8 rounded-full" variant="outline">
            <PlusIcon className="size-4" />
          </Button>
        </Link>
        <Button
          size="icon"
          onClick={() => refetch()}
          className="size-8 rounded-full"
          variant="outline"
        >
          <RefreshCwIcon className="size-4" />
        </Button>
      </div>
      <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8">
        {isPending ? (
          Array(12)
            .fill(0)
            .map((_val, idx) => <ProductItemSkeletonComponent key={idx} />)
        ) : error ? (
          <div className="col-span-4">{error.message}</div>
        ) : (
          products?.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <ProductItemComponent product={product} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
