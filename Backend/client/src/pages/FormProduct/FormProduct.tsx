import React from 'react'
import style from "./style.module.css"
import { TypeProductForm, FormElement, ServerError, MediaData, PropsModal, typeForm } from "./type";

import axios, { AxiosError } from 'axios';
import { InputField, FilterSelect, TextField, Button, Loader, Modal } from '../../UI'
import { createClasses } from '../../utility'
import { endPoints, listOfStatus } from '../../constant';
import { useStore } from '../../store';
import { Link, useLoaderData, useSubmit } from 'react-router-dom';
import { useFetch } from '../../hook';

const FormProduct: React.FC<typeForm> = ({ typeForm }) => {
    const { status, data } = useFetch<MediaData>(endPoints.media);
    const [show, setShow] = React.useState<boolean>(false);
    const [listMedia, setListMedia] = React.useState<string[]>([]);
    const { changeMessage } = useStore();
    const submit = useSubmit();

    const [productForm, setProductForm] = React.useState<TypeProductForm>({
        _id: "",
        media: "",
        title: "",
        price: 0,
        tags: "",
        description: "",
        status: "draft"
    });

    if (typeForm === "change") {
        const product = useLoaderData() as TypeProductForm;
        React.useEffect(() => {
            setProductForm(product);
            console.log(productForm);

        }, [])
    }

    const handleForm = React.useCallback((event: React.ChangeEvent<FormElement>): void => {
        const { name, value } = event.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }))
    }, [setProductForm])

    const handleActionProduct = async (): Promise<void> => {
        try {
            const pathType = typeForm === "create"
                ? endPoints.products
                : `${endPoints.products}/${productForm._id}`;
            const response = typeForm === "create"
                ? await axios.post(pathType, productForm)
                : await axios.patch(pathType, productForm);

            const data = await response.data;

            changeMessage(`Product ${data.product.title} was ${typeForm === "create" ? "created" : "changed"}`, "success");
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
    const handleShow = (): void => {
        setShow(prev => !prev);
    }
    const handleMedia = React.useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setListMedia(prevList =>
            prevList.includes(value)
                ? prevList.filter(el => el !== value)
                : [...prevList, value]
        );
    }, [setListMedia]);

    React.useEffect(() => {
        if (listMedia) {
            setProductForm(prev => ({
                ...prev,
                media: listMedia.join(",")
            }))
        }
    }, [listMedia])


    if (status == "loading" || data === null) {
        return <Loader />
    }

    return (
        <div className={style.productForm}>
            {typeForm === "create" &&
                <div className={style.formRow}>
                    <Button typeButton='button' onClick={handleShow} cssSelector={createClasses(style.button, "primary-button")}>Add media</Button>
                    <ModalComponent show={show} handleShow={handleShow} handleMedia={handleMedia} data={data} />
                </div>
            }
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
                    value={productForm.price}
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
                onClick={handleActionProduct}
                cssSelector={createClasses("primary-button", style.formButton)}
                typeButton='button'
            >
                {typeForm === "create" ? "Create" : "Change"}
            </Button>
        </div>
    )
}


const ModalComponent: React.FC<PropsModal> = ({ show, handleShow, handleMedia, data }) => {
    return (
        <Modal isActive={show} onClick={handleShow}>
            <div className={style.productModal}>
                <Button cssSelector={createClasses(style.modalClose, 'outline-primary-button')} typeButton='button' onClick={handleShow}>X</Button>
                {
                    data.media.length == 0
                        ? <div className={style.modalMessage}>
                            <Link to="/media">The media list is empty. Please upload media</Link>
                        </div>
                        :
                        <div className={style.modalImages}>
                            {
                                data.media.map(media => {
                                    return (
                                        <div key={media._id} className={style.modalItem}>
                                            <input type="checkbox" onChange={handleMedia} id={media._id} value={media._id} />
                                            <label htmlFor={media._id}>
                                                <img src={media.path} alt={media.name} loading='lazy' />
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>
        </Modal>
    )
}

export default FormProduct