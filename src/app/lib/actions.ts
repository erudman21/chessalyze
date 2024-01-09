"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OpenAI } from "openai";
import { cache } from "react";
import { EvaluateSearchParams } from "../evaluate/page";

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

export async function getPlayerInfo_CHESSCOM(username: string) {
  try {
    const res = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    const data = await res.json();

    if (!data || !data.archives) {
      return "User does not exist or hasn't played any games";
    }

    const availableUrls: string[] = data.archives;
    const url = availableUrls[Math.floor(Math.random() * availableUrls.length)];
    const matcher =
      /https:\/\/api.chess.com\/pub\/player\/(\w+)\/games\/(\d{4})\/(\d{2})/;
    const [, name, year, month] = url.match(matcher) ?? [];
    redirect(`/evaluate?user=${name}&month=${month}&year=${year}`);
  } catch (e) {
    throw e;
  }
}

export async function prepareEvaluate(
  prevState: string | undefined,
  formData: FormData
) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
  const thread = await openai.beta.threads.create();
  cookies().set("thread", thread.id);

  return getPlayerInfo_CHESSCOM(String(formData.get("username")));
}
