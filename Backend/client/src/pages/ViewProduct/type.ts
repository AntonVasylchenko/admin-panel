export type ProductData = {
  product: {
    _id: string,
    createdAt: string,
    updatedAt: string,
    description: string,
    images: string[],
    price:number,
    status: "active" | "draft",
    tags: string[],
    title: string
  }
}

export type ServerError = { msg: string };
