import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import stockApis from "./routes/stockApis";
import authApis from "./routes/authApis";
import cookieParser from "cookie-parser";
import { authVerify } from "./middlewares/authVerify";

// 初始化
config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:8000",
  credentials: true, // 允许携带 cookie
};

// 中間件
app.use(cors());
app.use(json());
app.use(cookieParser());

// 路由
app.use("/api", authApis);
app.use("/api/stock", authVerify, stockApis);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server123 is running on http://localhost:${PORT}`);
});
