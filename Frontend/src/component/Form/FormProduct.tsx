import React from 'react';
import { Form } from 'react-router-dom';
import style from "./form.module.css";
import { Button } from '../../ui';

const FormProduct: React.FC = () => {
    return (
        <Form method='post' className={style.form}>
            <div className={style["form-details"]}>
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
