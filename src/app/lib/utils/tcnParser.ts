// reference this post https://www.chess.com/clubs/forum/view/move-list-format-when-viewing-my-game-via-callback
// parser for tcn format from chess.com

const tcnChars =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?{~}(^)[_]@#$,./&-*++=";
const pieceChars = "qnrbkp";

export function decodeTCN(
  tcnString: string
): { to: string; drop?: string; from?: string; promotion?: string }[] {
  let moves = [];

  for (let i = 0; i < tcnString.length; i += 2) {
    let currMove = {} as any;

    const source = tcnChars.indexOf(tcnString[i]);
    let target = tcnChars.indexOf(tcnString[i + 1]);

    if (source > 75) {
      currMove.drop = pieceChars[source - 79];
    } else {
      currMove.from = tcnChars[source % 8] + (Math.floor(source / 8) + 1);
    }

    if (target > 63) {
      currMove.promotion = pieceChars[Math.floor((target - 64) / 3)];
      target = source + (source < 16 ? -8 : 8) + ((target - 1) % 3) - 1;
    }

    currMove.to = tcnChars[target % 8] + (Math.floor(target / 8) + 1);
    moves.push(currMove);
  }
  return moves;
}
