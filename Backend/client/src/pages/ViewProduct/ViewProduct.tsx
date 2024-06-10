import React from 'react'
import style from "./style.module.css"
import { ProductData, ServerError } from "./type"

import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../hook'
import { endPoints } from '../../constant'
import { Button, Loader } from '../../UI'
import { converToMoney, createClasses } from '../../utility'
import axios, { AxiosError } from 'axios'
import { useStore } from '../../store'


const ViewProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const path = `${endPoints.products}/${productId}`
  const { status, data } = useFetch<ProductData>(path);
  const { changeMessage } = useStore();

  if (status == "loading" || data === null) {
    return <Loader />
  }

  const { product } = data;

  const handleRemove = async (): Promise<void> => {
    try {
      const response = await axios.delete(path);
      const data = await response.data;
      changeMessage(data.msg, "success");
      navigate("/products");
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


  console.log(product);

  return (
    <div className={style.product}>
      <div className={style.controller}>
        <Button onClick={handleRemove} typeButton='button' cssSelector={createClasses(style.buttonRemove, "cancel-button")}>Remove </Button>
        <Link className={style.linkEdit} to="edit">Edit</Link>
      </div>
      {product.images.length !== 0
        &&
        <div className={style.media}>
          <img src={product.images[0]} alt="Image" loading='lazy' />
        </div>
      }
      <div className={style.info}>
        <h2 className={createClasses(style.productTitle, "main-title")}>
          {product.title}
        </h2>
        <p className={createClasses(style.productDescription, "body-text")}>{product.description}</p>
        <p className={createClasses(style.productPrice, "body-text")}>Price: {converToMoney(product.price)}</p>
        <p className={createClasses(style.productTags, "body-text")}>
          {product.tags
            .filter(tag => tag !== "")
            .map(tag => {
              return (
                <span className='small-text' key={"tag" + tag}>{tag}</span>
              )
            })}
        </p>
        <p className={createClasses(style.productStatus, "body-text")}>Status: {product.status}</p>
      </div>
    </div>
  )
}

export default ViewProduct