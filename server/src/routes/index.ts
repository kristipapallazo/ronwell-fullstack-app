import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const router = Router();

router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getOneById);
router.post("/", ProductController.save);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
