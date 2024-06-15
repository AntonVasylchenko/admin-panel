export type CollectionItem = {
  _id: string,
  title: string,
  images: string[],
  tags: string[],
  products:string[]
}
export type CollectionData = {
  collections: CollectionItem[]
}