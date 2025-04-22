import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import stockApis from "./routes/stockApis";

// 初始化
config();
const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(json());

// 路由
app.use("/api/stock", stockApis);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server123 is running on http://localhost:${PORT}`);
});
