import { ReactNode } from "react";

interface IRootLayoutComponentProps {
  children: ReactNode;
}

export default function RootLayoutComponent(props: IRootLayoutComponentProps) {
  const { children } = props;
  return children;
}