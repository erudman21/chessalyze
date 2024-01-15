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

export type RedisUserResponse = Record<string, string>;
