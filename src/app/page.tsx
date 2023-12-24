import Board from "./ui/Board";
import { ChessComStats } from "./ui/ChessComStats";

export default function Home() {
  return (
    <main className="flex">
      <div className="flex-1">
        <Board />
      </div>
      <div className="flex-1">
        <ChessComStats />
      </div>
    </main>
  );
}
