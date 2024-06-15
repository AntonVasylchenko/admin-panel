export type ServerError = { msg: string };

export type CollectionData = {
  collection: {
    _id: string;
    images: string[];
    products: string[];
    tags: string[];
    title: string;
  };
};
export type ProdcutItemData = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  images: string[];
  price: number;
  status: "active" | "draft";
  tags: string[];
  title: string;
};
export type ProductsData = {
  products: ProdcutItemData[];
};
