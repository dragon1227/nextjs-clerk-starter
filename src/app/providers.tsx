import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface IRootProvider {
  children: ReactNode;
}

export default function RootProvider(props: IRootProvider) {
  const { children } = props;
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}
