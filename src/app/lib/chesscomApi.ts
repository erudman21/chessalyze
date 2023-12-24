import { cache } from "react";

type ChessCOMResponseObject = {
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

type ChessCOMUserObject = {
  rating: number;
  result: string;
  "@id": string;
  username: string;
  uuid: string;
};

export const getGamesForPlayer_CHESSCOM = cache(
  async (
    username: string,
    year: number,
    month: number
  ): Promise<[ChessCOMResponseObject] | undefined> => {
    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
      );
      const data = await res.json();

      return data.games;
    } catch (e) {
      console.log(e);
    }
  }
);
