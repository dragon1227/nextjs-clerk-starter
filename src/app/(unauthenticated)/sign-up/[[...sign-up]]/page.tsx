"use client";

import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function SignUpPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <SignUp
        appearance={{
          baseTheme: isDark ? dark : undefined,
        }}
      />
    </div>
  );
}
