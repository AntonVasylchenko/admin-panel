import React from 'react'
import style from '../PopUpImages/popupimages.module.css'
import Button from '../Button/Button'


type Props = {
    images: {
        _id: string,
        path: string
    }[],
    show: boolean,
    handleShow: () => void


}
const PopupImages: React.FC<Props> = ({ images = [], show = false, handleShow }) => {
    const containerClassName = show ? `${style["container"]} ${style["container--active"]}` : style["container"];
    const handleStop = (event: React.MouseEvent<HTMLDivElement>): void => {
        event.stopPropagation();
    }

    const [mediaId, setMediaId] = React.useState<string[]>([]);

    const handlerAddIdMedia = (event: React.MouseEvent<HTMLDivElement>): void => {
        const target = event.target as HTMLDivElement;
        const { dataset: { media } } = target;
        if (media && typeof media === "string") {
            setMediaId(prev => toggleElementInArray(prev, media))
        }
    }

    const toggleElementInArray = (array: string[], element: string): string[] => {
        const index = array.indexOf(element);
        return index === -1 ? [...array, element] : array.filter(item => item !== element)
    };

    const checkerOnActiveClass = (array: string[], id: string): string => {
        const index = array.indexOf(id);
        return index === -1 ? "" : style["content__item--active"]
    }

    return (
        <div onClick={handleShow} className={containerClassName}>
            <input type="hidden" name='media' defaultValue={mediaId.join(",")} />
            <div onClick={handleStop} className={style["content"]}>
                {
                    images.map(img => {
                        return (
                            <div
                                onClick={handlerAddIdMedia}
                                className={`${style["content__item"]} ${checkerOnActiveClass(mediaId, img._id)}`}
                                key={img.path}
                                data-media={img._id}
                            >
                                <img src={img.path} width={100} height={100} alt="" loading='lazy' />
                            </div>
                        )
                    })
                }
                <Button type="button" onClick={handleShow}  link={false} cssSelector={`${style["content__button"]} `}>Close</Button>

            </div>
        </div>
    )
}

export default PopupImages