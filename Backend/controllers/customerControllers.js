import { customerModel } from "../models/index.js";
import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";
import {
  attachCookiesToResponse,
  createTokenCustomer,
} from "../utility/utiltityAuth.js";

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
  if (!req.customer) {
    throw new customError.NotFoundError("Not found current customer");
  }

  res.status(StatusCodes.OK).json({ customer: req.customer });
}

async function updateCustomer(req, res) {
  const { firstName, lastName, email, role } = req.body;

  const customer = await customerModel.findOne({
    _id: req.customer.customerId,
  });

  if (firstName) {
    customer.firstName = firstName;
  }
  if (lastName) {
    customer.lastName = lastName;
  }
  if (email) {
    customer.email = email;
  }
  if (role) {
    customer.role = role;
  }

  await customer.save();

  const tokenCustomer = createTokenCustomer(customer);
  attachCookiesToResponse({ res, customer: tokenCustomer });
  res.status(StatusCodes.OK).json({ tokenCustomer });
}

async function updateCustomerPassword(req, res) {
  const {oldPassword,newPassword} = req.body;

  if (!oldPassword || !newPassword) {
    throw new customError.NotFoundError("Please provide both values")
  }

  const customer = await customerModel.findOne({
    _id: req.customer.customerId,
  });

  const isPasswordCorrect = await customer.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new customError.UnauthenticatedError("Invalid password")
  }
  customer.password = newPassword;

  await customer.save();

  res.status(StatusCodes.OK).json({msg: "Password was changed correctly"})
}

const customerContollers = {
  getAllCustomer,
  getSingleCustomer,
  getCurrentCustomer,
  updateCustomer,
  updateCustomerPassword,
};

export default customerContollers;
