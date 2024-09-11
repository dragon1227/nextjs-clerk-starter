import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TProduct } from "@/types/product";
import { DollarSignIcon } from "lucide-react";
import Image from "next/image";

export interface IProductItemComponentProps {
  product: TProduct;
}

export default function ProductItemComponent(
  props: IProductItemComponentProps
) {
  const { product } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {product.category}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full !h-60 rounded-xl overflow-hidden group">
          <Image
            src={product.image}
            width={300}
            height={240}
            className="!size-full object-cover group-hover:scale-105 transition-transform"
            alt={product.title}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-xl">
          <DollarSignIcon className="size-6" /> {product.price}
        </div>
      </CardFooter>
    </Card>
  );
}

export function ProductItemSkeletonComponent() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
