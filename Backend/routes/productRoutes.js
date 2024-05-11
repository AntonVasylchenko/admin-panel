import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSinleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import createLog from "../middleware/createLog.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/", createLog({type: "product", action: "Created" }),createProduct);
router.get("/:id", getSinleProduct);
router.patch("/:id",createLog({type: "product", action: "Changed" }),updateProduct);
router.delete("/:id",createLog({type: "product", action: "Deleted" }),deleteProduct);

export default router;
