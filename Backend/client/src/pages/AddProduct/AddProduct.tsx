import React from 'react'
import style from "./style.module.css"
import { TypeProductForm, FormElement, ServerError } from "./type";

import axios, { AxiosError } from 'axios';
import { InputField, FilterSelect, TextField, Button } from '../../UI'
import { createClasses } from '../../utility'
import { endPoints } from '../../constant';
import { useStore } from '../../store';
import { useSubmit } from 'react-router-dom';




const listOfStatus = ['draft', "active"];
const AddProduct: React.FC = () => {
    const { changeMessage } = useStore();
    const submit = useSubmit();
    const [productForm, setProductForm] = React.useState<TypeProductForm>({
        title: "",
        price: null,
        tags: "",
        description: "",
        status: "draft"
    });

    const handleForm = React.useCallback((event: React.ChangeEvent<FormElement>): void => {
        const { name, value } = event.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }))
    }, [setProductForm])

    const handleCreateProduct = async (): Promise<void> => {
        try {
            const response = await axios.post(endPoints.products, productForm);
            const data = await response.data;
            changeMessage(`Product ${data.product.title} was created`, "success");
            submit(data.product._id, { method: "post", encType: "text/plain" });
        } catch (error) {
            let messageError = "Error";
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<ServerError>;
                if (serverError.response?.data.msg) {
                    const { msg } = serverError.response?.data;
                    messageError = msg;
                }
            }

            changeMessage(messageError, "error");
        }
    }

    return (
        <div className={style.productForm}>
            <div className={style.formRow}>
                <InputField
                    type='text'
                    name="title"
                    label='Title'
                    value={productForm.title}
                    onChange={handleForm}
                />
            </div>
            <div className={style.formRow}>
                <InputField
                    type='number'
                    name="price"
                    label='Price'
                    value=""
                    onChange={handleForm}
                />
            </div>
            <div className={style.formRow}>
                <TextField
                    name="description"
                    type='description'
                    label='Description'
                    value={productForm.description}
                    onChange={handleForm}
                />
            </div>
            <div className={style.formRow}>
                <InputField
                    type='text'
                    name="tags"
                    label='Tags'
                    value={productForm.tags}
                    onChange={handleForm}
                />
            </div>
            <div className={style.formRow}>
                <FilterSelect
                    cssSelector={style.formRowSelect}
                    type='status'
                    label='Status'
                    name='status'
                    options={listOfStatus}
                    onChange={handleForm}
                    value={productForm.status}
                />
            </div>
            <Button
                onClick={handleCreateProduct}
                cssSelector={createClasses("primary-button", style.formButton)}
                typeButton='button'
            >
                Create
            </Button>
        </div>
    )
}

export default AddProduct