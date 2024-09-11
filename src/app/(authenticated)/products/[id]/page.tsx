"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProduct, TProductUpdate, ZProductUpdate } from "@/types/product";
import { useGetProducts } from "@/hooks/use-product";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { RefreshCwIcon } from "lucide-react";
import { QUERY_KEYS } from "@/config/const";
import {
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import { Spinner } from "@/components/common/Spinner";

export default function ProductEditPage(props: { params: { id: string } }) {
  const id = props.params.id;
  const { data: products, isPending } = useGetProducts();
  const [isUpdating, startUpdating] = useTransition();
  const product = useMemo(() => {
    if (isPending) return undefined;
    return (
      products?.find((product) => String(product.id) === String(id)) ??
      undefined
    );
  }, [isPending, products, id]);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setValue,
    reset: resetForm,
    formState: { errors, isValid },
  } = useForm<TProductUpdate>({
    mode: "onChange",
    resolver: zodResolver(ZProductUpdate),
    defaultValues: {
      image: product?.image,
      category: product?.category,
      price: product?.price,
      description: product?.description,
      id: id ? parseInt(id) : undefined,
      title: product?.title,
    },
  });
  const reset = useCallback(() => {
    if (product) {
      setValue("id", product.id);
      setValue("category", product.category);
      setValue("title", product.title);
      setValue("description", product.description);
      setValue("image", product.image);
      setValue("title", product.title);
      setValue("price", product.price);
    } else {
      resetForm();
    }
  }, [product, setValue, resetForm]);
  useEffect(() => {
    reset();
  }, [reset]);
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TProductUpdate> = useCallback(
    (data) => {
      startUpdating(() => {
        router.replace("/products");
        queryClient.setQueryData(
          [QUERY_KEYS.products],
          (prevData: TProduct[] | undefined) => {
            if (prevData)
              return prevData.map((item) =>
                item.id === data.id ? { ...item, ...data } : item
              );
            else return [data];
          }
        );
        toast.success("Successfully updated");
      });
    },
    [router, queryClient]
  );
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
  else
    return (
      <div className="relative flex flex-col justify-center p-2 container mx-auto gap-4">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold">Edit Product</div>
          <Button
            size="icon"
            onClick={() => reset()}
            className="size-8 rounded-full"
            variant="outline"
          >
            <RefreshCwIcon className="size-4" />
          </Button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 relative"
        >
          <Input {...register("title")} placeholder="Title" />
          {errors["title"] ? (
            <div className="text-destructive text-sm">
              {errors.title.message}
            </div>
          ) : null}
          <Input {...register("category")} placeholder="Category" />
          {errors["category"] ? (
            <div className="text-destructive text-sm">
              {errors.category.message}
            </div>
          ) : null}
          <Input {...register("description")} placeholder="Description" />
          {errors["description"] ? (
            <div className="text-destructive text-sm">
              {errors.description.message}
            </div>
          ) : null}
          <Input {...register("price")} placeholder="Price" />
          {errors["price"] ? (
            <div className="text-destructive text-sm">
              {errors.price.message}
            </div>
          ) : null}
          <div className="w-full relative flex items-center justify-end gap-2">
            <Button
              type="submit"
              disabled={!isValid || isPending}
              variant="default"
            >
              Submit
            </Button>
            <Button
              onClick={onDelete}
              disabled={isPending}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    );
}
