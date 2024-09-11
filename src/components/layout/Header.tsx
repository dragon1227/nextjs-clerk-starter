import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function HeaderComponent() {
  return (
    <div className="w-full flex items-center gap-4 p-2">
      <div className="flex-1">STARTER</div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
