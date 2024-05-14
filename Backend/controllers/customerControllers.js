import { customerModel } from "../models/index.js";
import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";

async function getAllCustomer(req, res) {
  const customers = await customerModel
    .find({ role: "user" })
    .select("-password");
  const customersLength = await customerModel.countDocuments({ role: "user" });

  res.status(StatusCodes.OK).json({ customers, count: customersLength });
}

async function getSingleCustomer(req, res) {
  const { id: customerId } = req.params;
  const customer = await customerModel
    .findOne({ _id: customerId })
    .select("-password");
  if (!customer) {
    throw new customError.NotFoundError(
      `Not found customer with id: ${customerId}`
    );
  }
  res.status(StatusCodes.OK).json({ customer });
}

async function getCurrentCustomer(req, res) {
  res.send("Get current user");
}

async function updateCustomer(req, res) {
  res.send("Update user");
}

async function updateCustomerPassword(req, res) {
  res.send("Update password user");
}

const customerContollers = {
  getAllCustomer,
  getSingleCustomer,
  getCurrentCustomer,
  updateCustomer,
  updateCustomerPassword,
};

export default customerContollers;
