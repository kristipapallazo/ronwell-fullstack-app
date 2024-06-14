import { Router } from "express";
import { ProductController } from "../controllers/ProductController";

const productRouter = Router();

productRouter.get("/", ProductController.getAll);
productRouter.get("/:id", ProductController.getOneById);
productRouter.post("/", ProductController.save);
productRouter.put("/:id", ProductController.update);
productRouter.delete("/:id", ProductController.delete);

export default productRouter;
