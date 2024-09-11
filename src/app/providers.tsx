import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface IRootProvider {
  children: ReactNode;
}

export default function RootProvider(props: IRootProvider) {
  const { children } = props;
  return <ClerkProvider>{children}</ClerkProvider>;
}
