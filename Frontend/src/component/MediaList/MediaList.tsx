import React from 'react'
import style from "./media-list.module.css"
import { useLoaderData } from 'react-router-dom'
import { Button } from '../../ui'
import MediaItem from '../MediaItem/MediaItem'
type MediaType = {
    [key: string]: {
        _id: string,
        path: string,
        name?: string
    }[]
}
const MediaList: React.FC = () => {
    const { media } = useLoaderData() as MediaType;
    if (!media.length) {
        return (
            <div className={style["media-list--empty"]}>
                <h2>List of media is empty, pleace add media</h2>
                <Button link={true} path='/add-media' cssSelector={style["media-list__link"]} >Add media</Button>
            </div>
        )
    }
    return (
        <div className={style["media-list"]}>
            {media && media.map(mediaElement => {
                return (
                    <MediaItem key={mediaElement._id} name={mediaElement.name} path={mediaElement.path} id={mediaElement._id} />
                )
            })}
        </div>
    )
}

export default MediaList