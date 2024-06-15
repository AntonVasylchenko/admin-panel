export type Log = {
  _id: string,
  action: string,
  name: string,
  product: string,
  createdAt: string,
  updatedAt: string
}
export type LoginType = {
  isLogin: boolean,
  log: Log[]
};
export type ActionType = { 
  msg: string, 
  typeMsg: "success" | "error" | "" 
};
export type TokenCustomer = {
  [key: string]: {
      firstName: string
      lastName: string
      customerId: string
      role: string
  }
}

export type FilterProduct = {
  sort: string[],
  status: string[],
  amount: number[]
}