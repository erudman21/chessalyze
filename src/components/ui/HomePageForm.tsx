"use client";

import { useContext, useState } from "react";
import { BoardContext } from "../../app/board-provider";
import { useRouter } from "next/navigation";
import { prepareEvaluate } from "../../app/lib/actions";
import { Label } from "./shadcn/ui/label";
import { Input } from "./shadcn/ui/input";
import { cn } from "../../lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "./shadcn/ui/button";

export default function HomePageForm() {
  const [error, setError] = useState("");
  const { game, setBoardOrientation } = useContext(BoardContext);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const { error, game: currGame } = await prepareEvaluate(formData);

    if (error || !game) {
      setError(error || "Something went wrong fetching a game");
      return;
    }

    game.loadPgn(currGame?.pgn!);
    setBoardOrientation(game.turn() === "b" ? "black" : "white");
    router.push("/evaluate");
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
              className="flex items-end space-x-1"
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
