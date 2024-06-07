export type TypeProductForm = {
    media: string,
    title: string,
    price: number,
    description: string,
    tags: string,
    status: "draft" | "active"
}

export type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type ServerError = { msg: string };

export type MediaItemData = {
    _id: string,
    path: string,
    name: string,
    public_id: string
}
export type MediaData = {
    media: MediaItemData[],
}
export type PropsModal = {
    show: boolean,
    handleMedia: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleShow: () => void,
    data: MediaData
}