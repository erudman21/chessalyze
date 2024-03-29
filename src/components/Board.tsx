"use client";

import { useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { BoardContext } from "./BoardProvider";

export default function Board() {
  const { game, boardState, setBoardState, boardOrientation } =
    useContext(BoardContext);

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    if (!game) return false;

    try {
      const move = game!.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setBoardState(game.fen());

      if (move === null) return false;

      if (game.isGameOver()) return false;

      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="max-w-[90vh] ml-auto">
      <Chessboard
        position={boardState}
        boardOrientation={boardOrientation as any}
        onPieceDrop={onDrop}
      />
    </div>
  );
}
