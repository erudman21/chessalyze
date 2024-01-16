import { Redis } from "ioredis";
import { RedisUserResponse } from "./types";

const globalForRedis = global as unknown as { redis: Redis };
export const redis = globalForRedis.redis || new Redis();

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;

export const getRedisUserInfo = async (
  email: string
): Promise<RedisUserResponse> => {
  const userGameInfo = await redis.hgetall(email);

  return {
    thread: userGameInfo.thread,
    chessCOMGame: JSON.parse(userGameInfo.chessCOMGame),
    game: JSON.parse(userGameInfo.game),
  };
};

export default redis;
