export type FilterType = {
    page: number,
    limit: number,
    sort: string,
    status: string
}

export type ProducItemData = {
    _id: string,
    title: string,
    price: number,
    images: string[],
    tags?: string[]
}
export type ProductsData = {
    currentCount: number,
    currnetPage: string,
    maxPages: number,
    products: ProducItemData[],
    totalProduct: number
}