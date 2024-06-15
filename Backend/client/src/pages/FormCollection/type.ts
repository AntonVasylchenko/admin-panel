export type typeForm = {
  typeForm: "create" | "change";
};

export type CollectionFormType = {
  _id?: string | undefined;
  title: string;
  images: string;
  tags: string;
  products: string;
};

export type MediaItemData = {
  _id: string;
  path: string;
  name: string;
  public_id: string;
};
export type MediaData = {
  media: MediaItemData[];
};

export type PropsModal = {
  show: boolean;
  handleMedia: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShow: () => void;
  data: MediaData;
};

export type ProductDataItem = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  images: string[];
  price: number;
  status: "active" | "draft";
  tags: string[];
  title: string;
}
export type ProductData = {
  products: ProductDataItem[];
};

export type ServerError = { msg: string };
