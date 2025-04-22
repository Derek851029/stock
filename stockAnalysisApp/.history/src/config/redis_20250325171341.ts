import redis from "redis";

// 配置 Redis 客户端连接
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || "localhost", // Redis 服务器的主机（默认是 localhost）
  port: process.env.REDIS_HOST || 6379, // Redis 服务器的端口（默认是 6379）
  password: process.env.REDIS_HOST || "your_password", // 如果你的 Redis 服务器有密码，可以在这里设置
  db: 0, // 选择 Redis 数据库，默认是 0
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }

    return Math.min(options.attempt * 100, 3000);
  },
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
