"use server";

import { redirect } from "next/navigation";
import { cache } from "react";

export type ChessCOMResponseObject = {
  url: string;
  pgn: string;
  time_control: string;
  end_time: number;
  rated: boolean;
  tcn: string;
  uuid: string;
  initial_setup: string;
  fen: string;
  time_class: string;
  rules: string;
  white: ChessCOMUserObject;
  black: ChessCOMUserObject;
};

export type ChessCOMUserObject = {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
};

export const getGamesForPlayer_CHESSCOM = cache(
  async (url: string): Promise<[ChessCOMResponseObject] | undefined> => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      return data.games;
    } catch (e) {
      console.log(e);
    }
  }
);

export async function getPlayerInfo_CHESSCOM(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const username = String(formData.get("username"));
    const res = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    const data = await res.json();

    if (!data || !data.archives) {
      return "User does not exist or hasn't played any games";
    }

    const availableUrls: string[] = data.archives;
    const url = availableUrls[Math.floor(Math.random() * availableUrls.length)];
    const games = await getGamesForPlayer_CHESSCOM(url);
    const gameToEvaluate = games![Math.floor(Math.random() * games!.length)];
  } catch (e) {
    return "User does not exist or hasn't played any games";
  }

  redirect("/evaluate");
}
