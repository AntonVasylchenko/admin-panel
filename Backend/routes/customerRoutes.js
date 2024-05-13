import { Router } from "express";
import { customerContollers } from "../controllers/index.js";

const router = Router();

router.route("/").get(customerContollers.getAllCustomer);
router.route("/current").get(customerContollers.getCurrentCustomer);
router.route("/update").patch(customerContollers.updateCustomer);
router.route("/update-password").patch(customerContollers.updateCustomerPassword);

router.route("/:id").get(customerContollers.getSingleCustomer);


export default router