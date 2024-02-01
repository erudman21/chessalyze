"use client";

import { useState } from "react";
import { prepareEvaluate } from "../app/api/actions";
import { Label } from "./ui/shadcn/ui/label";
import { Input } from "./ui/shadcn/ui/input";
import { cn } from "../lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "./ui/shadcn/ui/button";

export default function EvaluateForm() {
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const err = await prepareEvaluate(formData);
    setError(err);
  };

  return (
    <form action={handleSubmit}>
      <div className={cn("grid gap-6")}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="chesscomUsername">
              Chess.com username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="MagnusCarlsen"
              autoCapitalize="none"
              autoCorrect="off"
              autoFocus
              autoComplete="off"
            />
            <div
              className="flex items-center space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {error && (
                <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{error}</p>
                </>
              )}
            </div>
          </div>
          <Button>Evaluate</Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <Button variant="outline" type="button">
          Randomize
        </Button>
      </div>
    </form>
  );
}
