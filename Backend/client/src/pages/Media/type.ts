export type MediaItemData = {
    _id: string,
    path: string,
    name: string,
    public_id: string
}
export type MediaData = {
    media: MediaItemData[],
}