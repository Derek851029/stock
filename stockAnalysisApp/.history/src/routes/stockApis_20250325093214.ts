import { Router } from "express";
import {
  getSingleStockData,
  getTopGainersData,
} from "../../controllers/StockDataController";

const router = Router();

router.get("/topGainers", getTopGainersData);
// 定義 API 路由
router.get("/single", getSingleStockData);

export default router;
