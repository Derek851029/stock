import { Router } from "express";
import { getSingleStockData,getTopGainersData } from "../../controllers/StockDataController";

const router = Router();

router.get("/stock/topGainers", getTopGainersData);
// 定義 API 路由
router.get("/stock/single", getSingleStockData);

export default router;
