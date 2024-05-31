import React from 'react'
import style from "./style.module.css"
import { MediaData } from "./type"

import { useFetch } from '../../hook'
import { endPoints } from '../../constant'
import { Button, Loader } from '../../UI'
import { Link } from 'react-router-dom'
import { createClasses } from '../../utility'
import axios from 'axios'
import { useStore } from '../../store'


const Media: React.FC = () => {
    console.count("render media")
    const { changeMessage } = useStore();
    const { status, data } = useFetch<MediaData>(endPoints.media);
    const [media, setMedia] = React.useState<MediaData>();


    React.useEffect(() => {
        if (data && status == "success") {
            setMedia(data)
        }
    }, [setMedia, data])

    const handleCopy = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { dataset: { path } } = event.target as HTMLButtonElement;
        if (typeof path === "string") {
            navigator.clipboard.writeText(path)
        }

    }, [])
    const handleRemove = React.useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const { dataset: { id } } = event.target as HTMLButtonElement;
            if (typeof id === "string") {
                const response = await axios(`${endPoints.media}/${id}`, {
                    method: "delete"
                })
                const { msg } = await response.data;
                changeMessage(msg, "success");
                if (media) {
                    const newObj = media.media.filter(el => el._id !== id);
                    setMedia(prev => ({
                        ...prev,
                        media: newObj
                    }));

                    ;
                }
            }
        } catch (error) {
            changeMessage("error", "error")
        }
    }, [setMedia, changeMessage, media])

    if (status == "loading" || data === null) {
        return <Loader />
    }

    return (
        <div className={style.media}>
            <Link
                className={createClasses(style.media_button, 'primary-button')}
                to="add"
            >
                Add new media
            </Link>
            {media?.media.length
                ?
                <div className={style.media_items}>
                    {media.media.map(item => {
                        return (
                            <div key={item._id} className={style.item}>
                                <div className={style.item_img}>
                                    <img src={item.path} alt={item.name} loading='lazy' />
                                </div>
                                <Button
                                    typeButton='button'
                                    data-path={item.path}
                                    cssSelector='secondary-button'
                                    onClick={handleCopy}
                                >
                                    Copy Path
                                </Button>
                                <Button
                                    onClick={handleRemove}
                                    typeButton='button'
                                    data-id={item._id}
                                    cssSelector='cancel-button'
                                >
                                    Remove
                                </Button>
                            </div>
                        )
                    })}
                </div>
                : <div className={style.media_not__found}>
                    <h2 className='main-title'>Not found</h2>
                </div>
            }
        </div>
    )
}

export default Media