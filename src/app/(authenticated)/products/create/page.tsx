"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TProduct, TProductCreate, ZProductCreate } from "@/types/product";
import { useCreateProduct } from "@/hooks/use-product";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, RefreshCwIcon } from "lucide-react";
import { QUERY_KEYS } from "@/config/const";
import Link from "next/link";

export default function ProductCreatePage() {
  const router = useRouter();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<TProductCreate>({
    mode: "onChange",
    resolver: zodResolver(ZProductCreate),
    defaultValues: {
      image: "https://i.pravatar.cc",
      category: "electronic",
      price: 0,
    },
  });
  const queryClient = useQueryClient();
  const onSubmit: SubmitHandler<TProductCreate> = (data) => {
    createProduct(data, {
      onSuccess: (res) => {
        toast.success("Successfully added");
        queryClient.setQueryData(
          [QUERY_KEYS.products],
          (prevData: TProduct[] | undefined) => {
            if (prevData) return [...prevData, res];
            else return [res];
          }
        );
        router.push("/products");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div className="relative flex flex-col justify-center p-2 container mx-auto gap-4">
      <div className="flex items-center gap-4">
        <Link passHref href="/products">
          <Button size="icon" className="size-8 rounded-full" variant="outline">
            <ChevronLeftIcon className="size-4" />
          </Button>
        </Link>
        <div className="text-xl font-bold">Add New Product</div>
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
          <div className="text-destructive text-sm">{errors.title.message}</div>
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
          <div className="text-destructive text-sm">{errors.price.message}</div>
        ) : null}
        <Button
          type="submit"
          disabled={!isValid || isPending}
          className="w-fit self-end"
          variant="default"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
