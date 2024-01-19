import Link from "next/link";
import { getCurrUserInfo } from "../app/api/actions";

export default async function ChessCOMGameInfo() {
  const {
    chessCOMGame: { white, black, time_control, url, date, result },
  } = await getCurrUserInfo();

  return (
    <div className="flex flex-col">
      <h1 className="flex gap-x-4 justify-center">
        <div className="flex-1 flex justify-end items-baseline gap-x-2">
          <p className="text-muted-foreground">({white.rating})</p>
          <Link
            href={`https://www.chess.com/member/${white.username}`}
            target="_blank"
            className="text-3xl"
          >
            {white.username}
          </Link>
        </div>
        <span className="flex w-[20px] items-end">vs.</span>
        <div className="flex-1 flex items-baseline gap-x-2">
          <Link
            href={`https://www.chess.com/member/${black.username}`}
            target="_blank"
            className="text-3xl"
          >
            {black.username}
          </Link>
          <p className="text-muted-foreground">({black.rating})</p>
        </div>
      </h1>
      <div className="flex items-center flex-col">
        <h2 className="flex text-lg text-muted-foreground leading-6">
          {`Played on ${date.month}/${date.day}/${date.year}`}
        </h2>
        <h2 className="flex text-lg text-muted-foreground leading-6">
          Result: {result}
        </h2>
        <Link
          href={url}
          target="_blank"
          className="flex text-blue-500 underline text-lg leading-6"
        >
          Game Link
        </Link>
      </div>
    </div>
  );
}
