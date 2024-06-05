export type TypeProductForm = {
    title: string,
    price: number | null,
    description: string,
    tags: string,
    status: "draft" | "active"
}

export type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type ServerError = { msg: string };