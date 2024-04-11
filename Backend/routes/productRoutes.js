import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSinleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
export const router = Router();

router.get("/",getAllProducts);
router.post("/",createProduct);
router.get("/:id",getSinleProduct);
router.patch("/:id",updateProduct);
router.delete("/:id",deleteProduct);