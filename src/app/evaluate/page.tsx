"use client";

import { KeyboardEvent, useContext, useEffect, useMemo, useState } from "react";
import { BoardContext } from "../board-provider";
import { Textarea } from "../../components/ui/shadcn/ui/textarea";
import "./evaluate.css";
import { Icons } from "../../components/ui/shadcn/ui/icons";
import Engine, { StockfishResponse } from "../lib/engine";
import { getOpenAIResponse } from "../lib/openAI";
import { cn } from "../../lib/utils";
import { Inter } from "next/font/google";

export type EvaluateSearchParams = {
  user?: string;
  month?: string;
  year?: string;
};

const inter = Inter({ subsets: ["latin"] });

export default function Page(searchParams: {
  searchParams: EvaluateSearchParams;
}) {
  const { game, setBoardState } = useContext(BoardContext);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<{ user: string; message: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const engine = useMemo(() => new Engine(15), []);
  const [evaluation, setEvaluation] = useState<number>();

  useEffect(() => {
    const movesArr = game?.getComments();

    if (movesArr) {
      const start = 10;
      const end = movesArr.length - 10;
      const currMove = movesArr.slice(start, end)[
        Math.floor(Math.random() * (end - start))
      ];
      if (currMove) {
        game?.load(currMove.fen);
        setBoardState(currMove.fen);
        engine.evaluatePosition(game!.fen());
      }
    }
  }, [game, engine, setBoardState]);

  engine!.onMessage(({ evaluation: sfEval }: StockfishResponse) => {
    if (game) {
      if (game.turn() === "b") {
        setEvaluation(-sfEval);
      } else {
        setEvaluation(sfEval);
      }

      console.log(evaluation);
    }
  });

  const handleKeyPress = async (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setChat((prev) => [{ user: "You", message: userInput }, ...prev]);
      setUserInput("");
      setLoading(true);
      const resp = await getOpenAIResponse(game!.fen(), userInput, evaluation);
      setLoading(false);
      setChat((prev) => [{ user: "ChatGPT", message: resp }, ...prev]);
    }
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-col-reverse overflow-y-auto h-full mb-2">
        {chat.map(({ user, message }, i) => (
          <div className="mb-5 break-words" key={i}>
            <div className="font-semibold text-lg">{user}</div>
            <pre
              className={cn(
                `flex flex-col leading-5 text-muted-foreground whitespace-pre-wrap ${
                  inter.className
                } ${i == 0 ? "fade-in-text" : ""}`
              )}
            >
              {message}
            </pre>
          </div>
        ))}
      </div>
      <div className="mt-auto mb-[15vh] relative">
        <Textarea
          id="evaluation"
          placeholder="Give your evaluation for the position and the justification for the evaluation here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        {loading ? (
          <Icons.spinner className="animate-spin absolute top-[30%] left-[50%] w-8 h-8 flex justify-center items-center z-10"></Icons.spinner>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
