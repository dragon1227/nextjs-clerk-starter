import HeaderComponent from "@/components/layout/Header";
import { ReactNode } from "react";

interface IUnauthenticatedLayoutProps {
  children: ReactNode;
}

export default async function UnauthenticatedLayout(
  props: IUnauthenticatedLayoutProps
) {
  const { children } = props;
  return (
    <div className="w-full min-h-screen flex flex-col relative gap-2 items-center">
      <HeaderComponent />
      <div className="w-full flex-1 relative flex flex-col">{children}</div>
    </div>
  );
}
