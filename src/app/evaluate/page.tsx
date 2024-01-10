"use client";

import { KeyboardEvent, useContext, useEffect, useMemo, useState } from "react";
import { BoardContext } from "../board-provider";
import { Textarea } from "../../components/ui/shadcn/ui/textarea";
import "./evaluate.css";
import { Icons } from "../../components/ui/shadcn/ui/icons";
import Engine, { StockfishResponse } from "../lib/engine";
import { getOpenAIResponse } from "../lib/openAI";

export type EvaluateSearchParams = {
  user?: string;
  month?: string;
  year?: string;
};

export default function Page(searchParams: {
  searchParams: EvaluateSearchParams;
}) {
  const { game, setBoardState } = useContext(BoardContext);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);
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
      setChat((prev) => [userInput, ...prev]);
      setUserInput("");
      setLoading(true);
      const resp = await getOpenAIResponse(game!.fen(), userInput, evaluation);
      setLoading(false);
      setChat((prev) => [resp, ...prev]);
    }
  };

  return (
    <div className="flex flex-col h-[100vh]">
      <div className="flex flex-col-reverse overflow-y-auto h-full mb-2 gap-2">
        {chat.map((message, i) => (
          <div className="fade-in-text flex flex-col leading-5" key={i}>
            {message}
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
