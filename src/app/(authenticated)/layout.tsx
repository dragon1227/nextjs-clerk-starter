import HeaderComponent from "@/components/layout/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode, Suspense } from "react";

interface IProductsLayoutProps {
  children: ReactNode;
}

export default async function ProductsLayout(props: IProductsLayoutProps) {
  const { children } = props;
  return (
    <div className="w-full h-screen flex flex-col relative items-center">
      <HeaderComponent />
      <ScrollArea className="relative w-full flex-1 overflow-y-auto p-4">
        <Suspense>{children}</Suspense>
      </ScrollArea>
    </div>
  );
}
