import jwt from "jsonwebtoken";

export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

export const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const createTokenCustomer = (customer) => {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    customerId: customer._id,
    role: customer.role,
  };
};

export const attachCookiesToResponse = ({ res, customer }) => {
  const token = createJWT({ payload: customer });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });
};
