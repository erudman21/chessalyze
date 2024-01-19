"use server";

import { openai } from "./openAiClient";
import redis, { getRedisUserInfo } from "./redis";
import { getServerSession } from "next-auth";
import { ChessCOMResponseObject } from "./types";
import { Chess } from "chess.js";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function setCHESSCOMGame(
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

export async function getCurrUserInfo() {
  const userSession = await getServerSession();

  if (!userSession?.user?.email) {
    throw Error("User possibly not authenticated");
  }

  return getRedisUserInfo(userSession.user.email);
}

export async function prepareEvaluate(formData: FormData) {
  const thread = await openai.beta.threads.create();
  const userSession = await getServerSession();

  if (!userSession?.user?.email) {
    throw Error("User possibly not authenticated");
  }

  const searchUsername = String(formData.get("username"));
  const { game: chessCOMGame, error } = await setCHESSCOMGame(searchUsername);

  if (error || !chessCOMGame) {
    return "User does not exist or has no games played";
  }

  const game = new Chess();
  game.loadPgn(chessCOMGame.pgn);

  const movesArr = game.getComments();
  if (movesArr) {
    const start = 10;
    const end = movesArr.length - 10;
    const currMove = movesArr.slice(start, end)[
      Math.floor(Math.random() * (end - start))
    ];
    if (currMove) {
      game.load(currMove.fen);
    }
  }

  await redis.hset(userSession.user.email, {
    thread: thread.id,
    chessCOMGame: JSON.stringify(chessCOMGame),
    game: JSON.stringify({
      fen: game.fen(),
      turn: game.turn(),
    }),
  });

  const path = `/evaluate?search=${encodeURIComponent(searchUsername)}`;
  revalidatePath(path);
  redirect(path);
}
