import { StoreIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-6">
      <StoreIcon className="size-24" />
      <div className="text-center text-3xl">NextJS Clerk Starter</div>
    </div>
  );
}
