"use client";

import { useContext } from "react";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { BoardContext } from "../../app/board-provider";

export default function Board() {
  const { game, boardState, setBoardState } = useContext(BoardContext);

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
    <Chessboard
      boardWidth={800}
      position={boardState}
      onPieceDrop={onDrop}
      customBoardStyle={{ margin: "0 auto", transform: "translateY(8.5%)" }}
    />
  );
}
