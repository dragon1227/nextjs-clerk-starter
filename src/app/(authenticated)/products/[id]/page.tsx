"use client";

import { TProduct } from "@/types/product";
import { useGetProducts } from "@/hooks/use-product";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { ChevronLeftIcon, DollarSignIcon, RefreshCwIcon } from "lucide-react";
import { QUERY_KEYS } from "@/config/const";
import { MouseEvent, useCallback, useMemo, useTransition } from "react";
import { Spinner } from "@/components/common/Spinner";
import Image from "next/image";
import Link from "next/link";

export default function ProductEditPage(props: { params: { id: string } }) {
  const id = props.params.id;
  const { data: products, isPending, refetch } = useGetProducts();
  const [isUpdating, startUpdating] = useTransition();
  const product = useMemo(() => {
    if (isPending) return undefined;
    return (
      products?.find((product) => String(product.id) === String(id)) ??
      undefined
    );
  }, [isPending, products, id]);
  const router = useRouter();
  const queryClient = useQueryClient();
  const onDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      event.preventDefault();
      startUpdating(() => {
        router.replace("/products");
        queryClient.setQueryData(
          [QUERY_KEYS.products],
          (prevData: TProduct[] | undefined) => {
            if (prevData)
              return prevData.filter((data) => String(data.id) !== String(id));
            else return [];
          }
        );
        toast.success("Successfully deleted");
      });
    },
    [router, queryClient, id]
  );
  if (isPending) return <Spinner />;
  else if (!product && !isUpdating) return notFound();
  else if (!product) return null;
  else
    return (
      <div className="relative flex flex-col justify-center p-2 container mx-auto gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-48 max-w-full rounded-xl overflow-hidden group">
            <Image
              src={product.image}
              alt={product.title}
              width={192}
              height={300}
              className="object-cover"
            />
          </div>
          <div className="h-fit flex-1 relative">
            <div className="flex items-center gap-4">
              <Link passHref href="/products">
                <Button
                  size="icon"
                  className="size-8 rounded-full"
                  variant="outline"
                >
                  <ChevronLeftIcon className="size-4" />
                </Button>
              </Link>
              <div className="text-xl font-bold">{product?.title}</div>
              <Button
                size="icon"
                onClick={() => refetch()}
                className="size-8 rounded-full"
                variant="outline"
              >
                <RefreshCwIcon className="size-4" />
              </Button>
            </div>
            <div className="flex items-center text-2xl">
              <DollarSignIcon className="size-8" />
              {product.price}
            </div>
            <p className="w-full break-before-all">{product.description}</p>
          </div>
        </div>
        <div>
          <div className="w-full relative flex items-center justify-end gap-2">
            <Button
              onClick={() => {
                router.push(`/products/${id}/edit`);
              }}
              disabled={isPending}
              variant="default"
            >
              Edit
            </Button>
            <Button
              onClick={onDelete}
              disabled={isPending}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
}
