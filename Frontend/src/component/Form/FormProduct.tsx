import React from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import style from "./form.module.css";
import { Button, PopupImages } from '../../ui';

type LoaderData = {
    _id: string,
    path: string
}[]


const FormProduct: React.FC = () => {
    const image = useLoaderData() as LoaderData;
    const [show, setShow] = React.useState<boolean>(false);
    
    const handleShow = React.useCallback(() => {
        setShow(prev => !prev)
    }, [])

 
    return (
        <Form method='post' className={style.form}>
            <PopupImages handleShow={handleShow} show={show} images={image} />
            <div className={style["form-details"]}>
                <div className={style["form-details__row"]}>
                    <Button type="button" onClick={handleShow} link={false} cssSelector={`${style["form-details__button"]} ${style["form-details__button--media"]}`}>Add media</Button>
                </div>
                <div className={style["form-details__row"]}>
                    <label htmlFor="title">Product title</label>
                    <input type="text" id='title' name="title" required />
                </div>
                <div className={style["form-details__row"]}>
                    <label htmlFor="price">Product price</label>
                    <input type="number" id="price" name="price" required />
                </div>
                <div className={style["form-details__row"]}>
                    <label htmlFor="tags">Product tags</label>
                    <input type="text" id='tags' name="tags" />
                </div>
                <div className={style["form-details__row"]}>
                    <label htmlFor="description">Product description</label>
                    <textarea name="description" id='description'></textarea>
                </div>
                <div className={style["form-details__row"]}>
                    <Button type="submit" link={false} cssSelector={style["form-details__button"]}>Create</Button>
                </div>
            </div>
        </Form>
    );
};

export default FormProduct;
