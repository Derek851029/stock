import { Router } from "express";
import { login, register } from "../../controllers/AuthController";

const router = Router();

router.post("/register", register);
// 定義 API 路由
router.post("/login", login);

export default router;
