import express, { json, NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import stockApis from "./routes/stockApis";
import authApis from "./routes/authApis";
import cookieParser from "cookie-parser";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

// 初始化
config();
const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(cors());
app.use(json());
app.use(cookieParser());

const SECRET_KEY = process.env.JWT_SECRET || "derek";
const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  verify(
    token,
    SECRET_KEY,
    (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      req.user = decoded;
      next();
    }
  );
};

// 路由
app.use("/api", authApis);
app.use("/api/stock", authenticate, stockApis);

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server123 is running on http://localhost:${PORT}`);
});
