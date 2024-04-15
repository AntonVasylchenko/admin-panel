import { Router } from "express";
import { createMedia, deleteMedia,allMedia } from "../controllers/mediaConrollers.js";

export const router = Router();

router.get("/", allMedia);
router.post("/", createMedia);
router.delete("/:id", deleteMedia);
