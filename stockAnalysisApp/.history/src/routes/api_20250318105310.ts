import { Router } from "express";
import { StockDataController } from "../controllers/StockDataController.ts";

const router = Router();

// 定義 API 路由
router.get("/stock", StockDataController);

export default router;
