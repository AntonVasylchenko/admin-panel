import { Router } from "express";
import { customerContollers } from "../controllers/index.js";
import { aurhenticateMiddleware } from "../middleware/index.js";

const router = Router();

router.route("/").get(customerContollers.getAllCustomer);
router
  .route("/current")
  .get(
    aurhenticateMiddleware.aurhenticateCustomer,
    customerContollers.getCurrentCustomer
  );
router
  .route("/update")
  .patch(
    aurhenticateMiddleware.aurhenticateCustomer,
    aurhenticateMiddleware.checkRoleCustomer,
    customerContollers.updateCustomer
  );
router
  .route("/update-password")
  .patch(
    aurhenticateMiddleware.aurhenticateCustomer,
    aurhenticateMiddleware.checkRoleCustomer,
    customerContollers.updateCustomerPassword
  );

router.route("/:id").get(customerContollers.getSingleCustomer);

export default router;
