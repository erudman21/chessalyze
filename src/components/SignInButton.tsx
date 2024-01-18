"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/shadcn/ui/button";
import { GoogleIcon } from "./ui/icons/google";
import { useState } from "react";
import { Icons } from "./ui/shadcn/ui/icons";

export default function SignInButton({ ...props }) {
  const [loading, setLoading] = useState(false);

  return (
    <div {...props}>
      <Button
        className="text-background rounded-lg w-full overflow-hidden gap-x-2"
        onClick={() => {
          setLoading(true);
          signIn("google", { callbackUrl: "/evaluate" });
        }}
      >
        {loading ? (
          <Icons.spinner className="animate-spin" />
        ) : (
          <>
            <GoogleIcon />
            Sign in with Google
          </>
        )}
      </Button>
    </div>
  );
}
