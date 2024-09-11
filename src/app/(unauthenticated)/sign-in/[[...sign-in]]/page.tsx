"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignInPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: isDark ? dark : undefined,
        }}
      />
    </div>
  );
}
