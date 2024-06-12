export type CookieData = {
  firstName: string,
  lastName: string,
  customerId: string,
  role: "admin" | "user" | "demo"
}

export type CustomerForm = {
  firstName: string,
  lastName: string,
  email: string,
  loaded: boolean
}

export type CustomerPassword = {
  oldPassword: string,
  newPassword: string
}

export type CustomerData = {
  customer: {
    _id: string,
    firstName: string,
    lastName: string,
    role: "admin" | "user" | "demo",
    email: string,
  }
}

export type ServerError = { msg: string };

export type TokenCustomer = {
  [key: string]: {
      firstName: string
      lastName: string
      customerId: string
      role: string
  }
}