"use client";

import { Chess } from "chess.js";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

export type BoardProviderType = {
  game: Chess | null;
  boardState: string;
  setBoardState: Dispatch<SetStateAction<string>>;
};

export const BoardContext = createContext<BoardProviderType>({
  game: null,
  boardState: "start",
  setBoardState: () => null,
});

export default function BoardStateWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const game = useMemo(() => new Chess(), []);
  const [boardState, setBoardState] = useState("start");
  // const engine = useMemo(() => new Engine(15), []);

  return (
    <BoardContext.Provider value={{ game, boardState, setBoardState }}>
      {children}
    </BoardContext.Provider>
  );
}
