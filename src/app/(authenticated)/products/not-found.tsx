import { Button } from "@/components/ui/button";
import { AlignLeftIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundpage() {
  return (
    <div className="size-full items-center justify-center flex flex-col gap-8 p-12">
      <AlignLeftIcon className="size-24 opacity-50" />
      <div className="text-center text-xl">Product Not Found</div>
      <Link passHref href={"/products"}>
        <Button>Go to List</Button>
      </Link>
    </div>
  );
}
