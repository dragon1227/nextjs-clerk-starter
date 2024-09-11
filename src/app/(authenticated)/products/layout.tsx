import HeaderComponent from "@/components/layout/Header";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

interface IProductsLayoutProps {
  children: ReactNode;
}

export default async function ProductsLayout(props: IProductsLayoutProps) {
  const { children } = props;
  const { userId } = auth();
  if (!userId) return redirect("/");
  return (
    <div className="w-full min-h-screen flex flex-col relative gap-2 items-center">
      <HeaderComponent />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
