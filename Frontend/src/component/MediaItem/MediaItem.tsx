import React from 'react'
import style from "./media-item.module.css";
import { Button } from '../../ui';
import { endPoints } from '../../constans/endPoint';


type MediaProps = {
  id:string,
  path: string,
  name?: string
}


const MediaItem: React.FC<MediaProps> = ({name,path,id}) => {
  const handleCopyPath = ():void => {
    navigator.clipboard.writeText(path);
  }
  const handleRemoveMedia = async():Promise<void> => {
    try {
      const response = await fetch(`${endPoints.media}/${id}`, {
        method: 'DELETE'
      })
      console.log(response);      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={style["media-item"]}>
      <img className={style["media-item__image"]} src={path} alt={name} loading='lazy' />
      <Button type="button" onClick={handleCopyPath} link={false} cssSelector={style['media-item__button']}>
        Copy
      </Button>
      <Button type="button" onClick={handleRemoveMedia} link={false} cssSelector={style['media-item__button-remove']}>
        remove
      </Button>
    </div>
  )
}

export default MediaItem