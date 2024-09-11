"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <SignIn />
    </div>
  );
}
