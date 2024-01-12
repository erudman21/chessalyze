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
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

export type BoardProviderType = {
  game: Chess | null;
  boardState: string;
  setBoardState: Dispatch<SetStateAction<string>>;
  boardOrientation: string;
  setBoardOrientation: Dispatch<SetStateAction<string>>;
};

export const BoardContext = createContext<BoardProviderType>({
  game: null,
  boardState: "start",
  setBoardState: () => null,
  boardOrientation: "white",
  setBoardOrientation: () => null,
});

export default function BoardStateWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const game = useMemo(() => new Chess(), []);
  const [boardState, setBoardState] = useState("start");
  const [boardOrientation, setBoardOrientation] = useState("white");

  return (
    <BoardContext.Provider
      value={{
        game,
        boardState,
        setBoardState,
        boardOrientation,
        setBoardOrientation,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
