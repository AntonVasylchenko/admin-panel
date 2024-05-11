import { Router } from "express";
import {
  getAllLog,
  getSingleLog,
  createLog,
  changeLog,
  removeAllLog,
  removeSingleLog,
} from "../controllers/logContollers.js";

const router = Router()

router.get("/", getAllLog);
router.post("/", createLog);
router.get("/:id", getSingleLog);
router.patch("/:id", changeLog);
router.delete("/", removeAllLog);
router.delete("/:id", removeSingleLog);

export default router
