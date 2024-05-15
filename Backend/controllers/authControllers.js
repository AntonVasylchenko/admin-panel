import { customerModel } from "../models/index.js";
import customError from "../errors/index.js";
import StatusCodes from "http-status-codes";
import {
  createTokenCustomer,
  attachCookiesToResponse,
} from "../utility/utiltityAuth.js";

async function register(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const isEmailExisted = await customerModel.findOne({ email });
  if (isEmailExisted) {
    throw new customError.BadRequestError("This Email is existed");
  }
  const isFirstAccount = (await customerModel.countDocuments({})) == 0;
  const role = isFirstAccount ? "admin" : "user";

  const customer = await customerModel.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });

  const tokenCustomer = createTokenCustomer(customer);
  attachCookiesToResponse({ res, customer: tokenCustomer });
  res.status(StatusCodes.CREATED).json({ tokenCustomer });
}
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customError.BadRequestError("Please provide email or password");
  }

  const customer = await customerModel.findOne({ email });

  if (!customer) {
    throw new customError.UnauthenticatedError("Invalid password or email");
  }

  const isPasswordCorrect = await customer.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new customError.UnauthenticatedError("Invalid password");
  }

  const tokenCustomer = createTokenCustomer(customer);
  attachCookiesToResponse({ res, customer: tokenCustomer });
  res.status(StatusCodes.OK).json({ tokenCustomer });
}
async function logout(req, res) {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Customer logout" });
}

const authControllers = {
  register,
  login,
  logout,
};

export default authControllers;
