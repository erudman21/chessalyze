import { fakeGames } from "../../../fakeGame";
import { getGamesForPlayer_CHESSCOM } from "../lib/chesscomApi";

export async function ChessComStats() {
  // const games = await getGamesForPlayer_CHESSCOM("namdur21", 2023, 12);
  const games = fakeGames;

  if (!games) {
    return <div>You have no played games in this month</div>;
  }

  const gameIndex = Math.floor(Math.random() * games.length);
  const currGame = games[gameIndex];

  return (
    <div className="rounded-xl bg-gray-500 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{currGame.url}</h3>
      </div>
      <p className={`truncate rounded-xl px-4 py-8 text-center text-2xl`}>
        {currGame.fen}
      </p>
    </div>
  );
}
