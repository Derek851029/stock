import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import stockApis from "./routes/stockApis";
import authApis from "./routes/authApis";
import dashboardApis from "./routes/dashboardApis";
import cookieParser from "cookie-parser";
import { authVerify } from "./middlewares/authVerify";

// 初始化
config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// 中間件
app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

// 路由
app.use("/api", authApis);
// app.use("/api/dashboard", authVerify, dashboardApis);
// app.use("/api/stock", authVerify, stockApis);
app.use("/api/dashboard", dashboardApis);
app.use("/api/stock", stockApis);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server123 is running on http://localhost:${PORT}`);
});
