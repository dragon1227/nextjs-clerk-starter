"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="size-full flex flex-col items-center justify-center">
      <SignUp />
    </div>
  );
}
