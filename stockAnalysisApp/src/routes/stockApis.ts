import { Router } from "express";
import { getSingleStockData } from "../../controllers/StockDataController";

const router = Router();

// 定義 API 路由
router.get("/single", getSingleStockData);

export default router;
