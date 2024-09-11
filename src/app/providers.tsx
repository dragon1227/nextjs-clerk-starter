"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { dark } from "@clerk/themes";

interface IRootProvider {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function RootProvider(props: IRootProvider) {
  const { children } = props;
  const { theme, systemTheme } = useTheme();
  const isDark =
    theme === "dark" || (theme === "system" && systemTheme === "dark");
  return (
    <ClerkProvider
      appearance={{
        baseTheme: isDark ? dark : undefined,
        userButton: {
          baseTheme: isDark ? dark : undefined,
        },
        signIn: {
          baseTheme: isDark ? dark : undefined,
        },
        signUp: {
          baseTheme: isDark ? dark : undefined,
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors />
      </QueryClientProvider>
      <ReactQueryDevtools client={queryClient} />
    </ClerkProvider>
  );
}
