export type ServerError = { msg: string };
export type CollectionData = {
    collection: {
      _id: string,
      images: string[],
      products: string[],
      tags: string[],
      title: string
    }
  }
  