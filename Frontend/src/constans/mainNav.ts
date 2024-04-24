type Navigation = {
    [nameGroup: string]: {
        id:string,
        name: string;
        path: string;
    }[];
};

export const mainNav: Navigation = {
    "Product": [
        { name: "Create product", path: "/create-product",id:"link-create-product" },
        { name: "Products", path: "/products",id:"link-all-product" },
    ],
    "Media": [
        { name: "Add media", path: "/add-media",id:"link-create-media" },
        { name: "Media", path: "/media",id:"link-all-media" },
    ],
};

