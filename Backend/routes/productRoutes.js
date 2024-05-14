import { Router } from "express";
import { createLog } from "../middleware/index.js";
import { productControllers } from "../controllers/index.js";

const router = Router();

router
  .route("/")
  .get(productControllers.getAllProducts)
  .post(
    createLog({ type: "product", action: "Created" }),
    productControllers.createProduct
  );

router
  .route("/:id")
  .get(productControllers.getSinleProduct)
  .patch(
    createLog({ type: "product", action: "Changed" }),
    productControllers.updateProduct
  )
  .delete(
    createLog({ type: "product", action: "Deleted" }),
    productControllers.deleteProduct
  );

export default router;
