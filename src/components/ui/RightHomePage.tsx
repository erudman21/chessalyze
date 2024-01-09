"use client";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useFormState } from "react-dom";
import { prepareEvaluate } from "../../app/lib/actions";
import { cn } from "../../lib/utils";
import { Button } from "./shadcn/ui/button";
import { Input } from "./shadcn/ui/input";
import { Label } from "./shadcn/ui/label";

export default function RightHomePage() {
  const [errorMessage, dispatch] = useFormState(prepareEvaluate, undefined);

  return (
    <>
      <div className="md:hidden"></div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Evaluate a position
              </h1>
              <p className="text-sm text-muted-foreground">
                Either enter a Chess.com username below or get a random game
                from a high-rated tournament
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <form action={dispatch}>
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
                    />
                    <div
                      className="flex items-end space-x-1"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {errorMessage && (
                        <>
                          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                          <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <Button>Evaluate</Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <Button variant="outline" type="button">
                Randomize
              </Button>
            </div>
            <p className="px-8 text-center text-sm"></p>
          </div>
        </div>
      </div>
    </>
  );
}
