"use client";

import { Chess } from "chess.js";
import { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

export default function Board() {
  const game = useMemo(() => new Chess(), []);
  const [position, setPosition] = useState(game.fen());

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
      setPosition(game.fen());

      if (move === null) return false;

      if (game.isGameOver()) return false;

      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="ml-20 mt-20">
      <Chessboard boardWidth={800} position={position} onPieceDrop={onDrop} />
    </div>
  );
}
