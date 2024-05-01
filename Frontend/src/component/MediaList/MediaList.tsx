import React from 'react'
import style from "./media-list.module.css"
import { useLoaderData } from 'react-router-dom'

type MediaType = {
    [key: string]: {
        _id: string,
        path: string,
        name?: string
    }[]
}
const MediaList: React.FC = () => {

    const { media } = useLoaderData() as MediaType;
    return (
        <div className={style.media_list}>

        </div>
    )
}

export default MediaList