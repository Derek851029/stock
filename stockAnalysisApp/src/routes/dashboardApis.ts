import { Router } from "express";
import {
  getIndicesData,
  getTopGainersData,
} from "../../controllers/dashboardController";

const router = Router();

router.get("/indices", getIndicesData);
// 定義 API 路由
router.get("/topGainers", getTopGainersData);

export default router;
