import React from 'react'
import style from "./form-media.module.css"
import { Button, Icon } from '../../ui'
import { redirect } from 'react-router-dom';

const FormMedia: React.FC = () => {
    const [media, setMedia] = React.useState<any>();
    const [preview, setPreview] = React.useState<string>();

    const handlePreviewImage = (): void => {
        if (!media) return;
        const reader = new FileReader();
        reader.readAsDataURL(media)
        reader.onload = () => {
            if (String(reader.result)) {
                setPreview(String(reader.result))
            }
        }
        reader.onerror = () => {
            console.log("error")
        }
    }

    React.useEffect(() => {
        handlePreviewImage()
    }, [media])

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files.length > 0) {
            const file: File = event.target.files[0];
            setMedia(file);
        }
    };

    const handleAddMedia = async () => {
        try {
            if (!media) {
                throw new Error("Please provide media")
            }
            const formData = new FormData()
            formData.append('file', media)
            const options = {
                method: 'POST',
                body: formData
            }
            setMedia(null);
            setPreview("");
            const response = await fetch("http://localhost:3000/api/v1/media", options);
            const result = response.json()
            console.log(result);


        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={style["form-media"]}>
            <div className={style["form-media__item"]}>
                <div className={style["form-media__row"]}>
                    <input className={style["form-media__input"]} type="file" onChange={handleFile} id="file" name="media" accept=".jpg, .jpeg, .png, .pdf" />
                    <label className={style["form-media__label"]} htmlFor="file">
                        <Icon type='upload' />
                        <span>Add media</span>
                    </label>
                </div>
            </div>
            <div className={style["form-media__item"]}>
                {preview &&
                    <div className={`${style["form-media__row"]} ${style["form-media__row--image"]}`}>
                        <h2>Preview image</h2>
                        <img src={preview} alt="Preview" loading='lazy' />
                    </div>
                }
            </div>


            <Button type="submit" onClick={handleAddMedia} link={false} cssSelector={media ? style["form-media__button"] : style["form-media__button--disabled"]}>Save media</Button>
        </div>
    )
}

export default FormMedia