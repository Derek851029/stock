import { Router } from "express";
import getSingleStockData from "../../controllers/StockDataController";

const router = Router();

// router.get("/stock/topGainers", getTopGainersData);

router.get("/stock", getSingleStockData);

export default router;
