"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/shadcn/ui/button";
import { GoogleIcon } from "./ui/icons/google";

export default function SignInButton({ ...props }) {
  return (
    <div {...props}>
      <Button
        className="text-background rounded-lg w-full overflow-hidden gap-x-2"
        onClick={() => signIn()}
      >
        <GoogleIcon />
        Sign in with Google
      </Button>
    </div>
  );
}
