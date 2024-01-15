"use server";

import { cache } from "react";
import { EvaluateSearchParams } from "../evaluate-temp/page";
import { openai } from "./openAiClient";
import redis from "./redis";
import { getServerSession } from "next-auth";
import { ChessCOMResponseObject, RedisUserResponse } from "./types";

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
      console.error(e);
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
  const userSession = await getServerSession();

  if (!userSession?.user?.email) {
    return "User possibly not authenticated";
  }

  const { game, error } = await getSingleGame_CHESSCOM(
    String(formData.get("username"))
  );

  if (error) {
    return error;
  }

  await redis.hset(userSession.user.email, {
    thread: thread.id,
    game: JSON.stringify(game),
  });

  // const userGameInfo = await redis.hgetall(userSession.user.email);

  // console.log(JSON.parse(userGameInfo.game));

  return getSingleGame_CHESSCOM(String(formData.get("username")));
}
