import redis from "redis";

const host = process.env.REDIS_HOST || "localhost";
const port = process.env.REDIS_PORT || 6379;
// 配置 Redis 客户端连接
const redisClient = redis.createClient({
  url: `redis://${host}:${port}`,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.log("Redis error: ", err);
});

process.on("exit", () => {
  redisClient.quit();
});

export default redisClient;
