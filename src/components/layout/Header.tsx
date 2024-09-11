"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeSwitcherComponent } from "../common/ThemeSwitcher";
import Link from "next/link";
import { ListIcon, PlusCircleIcon, StoreIcon } from "lucide-react";

export default function HeaderComponent() {
  return (
    <div className="w-full flex items-center gap-6 p-2 relative border-b">
      <Link href={"/"} className="flex items-center gap-2">
        <StoreIcon className="size-6 text-primary" />
        Fake Store
      </Link>
      <div className="flex items-center flex-1 gap-4">
        <SignedIn>
          <Link
            className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
            href={"/products"}
          >
            <ListIcon />
            <span className="hidden sm:block">Products</span>
          </Link>
          <Link
            className="flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
            href={"/products/create"}
          >
            <PlusCircleIcon />
            <span className="hidden sm:block">Add Product</span>
          </Link>
        </SignedIn>
      </div>
      <ThemeSwitcherComponent />
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
