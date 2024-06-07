export const PATH_API: string = import.meta.env.VITE_API_URL


type FilterProduct = {
    sort: string[],
    status: string[],
    amount: number[]
}

export const filterProduct: FilterProduct = {
    sort: ["none", "latest", "oldest", "a-z", "z-a"],
    status: ["all", "draft", "active"],
    amount: [5, 10, 15, 20, 30, 40, 50]
}

export const endPoints: { [key: string]: string } = {
    products: `${PATH_API}/api/v1/products`,
    media: `${PATH_API}/api/v1/media`,
    log: `${PATH_API}/api/v1/log`,
    collection: `${PATH_API}/api/v1/collection`,
    customer: `${PATH_API}/api/v1/customer`,
    auth: `${PATH_API}/api/v1/auth`,
}

export const menuList: { name: string, path: string }[] = [
    {
        name: "Product",
        path: "/products"
    },
    {
        name: "Collection",
        path: "/collection"
    },
    {
        name: "Media",
        path: "/media"
    },
    {
        name: "User",
        path: "/user"
    },
    {
        name: "Settings",
        path: "/settings"
    }
]

export const listOfStatus = ['draft', "active"];
