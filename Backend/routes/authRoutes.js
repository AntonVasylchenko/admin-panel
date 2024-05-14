import { Router } from "express";
import { authControllers } from "../controllers/index.js";

const router = Router();

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").get(authControllers.logout);

export default router;
