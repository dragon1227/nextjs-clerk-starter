"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

interface IRootProvider {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function RootProvider(props: IRootProvider) {
  const { children } = props;
  return (
    <ClerkProvider signInUrl="/sign-in" signUpUrl="/sign-up">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster richColors />
      </QueryClientProvider>
      <ReactQueryDevtools client={queryClient} />
    </ClerkProvider>
  );
}
