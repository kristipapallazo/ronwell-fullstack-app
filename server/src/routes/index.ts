import { Router } from "express";
import productRouter from "./productRoutes";
import authRoouter from "./authRoutes";

const router = Router();

router.use("/products", productRouter);
router.use(authRoouter);

export default router;
