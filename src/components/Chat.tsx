"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ScrollArea } from "./ui/shadcn/ui/scroll-area";
import { getOpenAIResponse } from "../app/api/openAI";
import { Textarea } from "./ui/shadcn/ui/textarea";
import { Icons } from "./ui/shadcn/ui/icons";
import { BoardContext } from "./BoardProvider";
import Engine, { StockfishResponse } from "../app/api/engine";
import { cn } from "../lib/utils";
import { Inter } from "next/font/google";
import { RedisUserResponse } from "../app/api/types";

const inter = Inter({ subsets: ["latin"] });

export default function Chat({
  userInfo,
  className = "",
}: {
  userInfo: RedisUserResponse;
  className?: string;
}) {
  const { setBoardState, setBoardOrientation } = useContext(BoardContext);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<{ user: string; message: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const engine = useMemo(() => new Engine(15), []);
  const [evaluation, setEvaluation] = useState<number>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const game = userInfo.game;

  useEffect(() => {
    setBoardState(game.fen);
    setBoardOrientation(game.turn === "b" ? "black" : "white");
    engine.evaluatePosition(game.fen);
  }, [engine, game, setBoardState, setBoardOrientation]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  engine!.onMessage(({ evaluation: sfEval }: StockfishResponse) => {
    if (game.turn === "b") {
      setEvaluation(-sfEval);
    } else {
      setEvaluation(sfEval);
    }
  });

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setChat((prev) => [{ user: "You", message: userInput }, ...prev]);
      setUserInput("");
      setLoading(true);
      const resp = await getOpenAIResponse(game.fen, userInput, evaluation);
      setLoading(false);
      setChat((prev) => [{ user: "ChatGPT", message: resp }, ...prev]);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <ScrollArea className="flex flex-grow">
        <div className="flex flex-col-reverse h-full mb-2 overflow-y-auto">
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
      </ScrollArea>
      <div className="w-full relative">
        <Textarea
          id="evaluation"
          placeholder="Give your evaluation for the position and the justification for the evaluation here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        {loading ? (
          <Icons.spinner className="animate-spin absolute bottom-[30%] left-[50%] w-8 h-8 flex justify-center items-center z-10"></Icons.spinner>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
