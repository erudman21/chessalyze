"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { EvaluateSearchParams } from "../evaluate/page";
import { openai } from "./openAiClient";
import redis from "./redis";

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
  async ({
    user,
    month,
    year,
  }: EvaluateSearchParams): Promise<[ChessCOMResponseObject] | undefined> => {
    try {
      return fetch(
        `https://api.chess.com/pub/player/${user}/games/${year}/${month}`
      )
        .then((res) => res.json())
        .then((data) => data.games);
    } catch (e) {
      console.log(e);
    }
  }
);

export async function getSingleGame_CHESSCOM(
  username: string
): Promise<{ error?: string; game?: ChessCOMResponseObject }> {
  const err = {
    error: "User does not exist or hasn't played any games",
  };

  try {
    const gameMonths = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    ).then((res) => res.json());

    if (!gameMonths || !gameMonths.archives) {
      return err;
    }

    const availableUrls: string[] = gameMonths.archives;
    const url = availableUrls[Math.floor(Math.random() * availableUrls.length)];
    const { games } = await fetch(url).then((res) => res.json());
    const currGame = games[Math.floor(Math.random() * games.length)];
    return { game: currGame };
  } catch (e) {
    return err;
  }
}

export async function prepareEvaluate(formData: FormData) {
  const thread = await openai.beta.threads.create();
  cookies().set("thread", thread.id);

  return getSingleGame_CHESSCOM(String(formData.get("username")));
}
