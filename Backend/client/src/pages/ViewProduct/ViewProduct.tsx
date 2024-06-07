import React from 'react'
import style from "./style.module.css"
import { ProductData } from "./type"

import { useParams } from 'react-router-dom'
import { useFetch } from '../../hook'
import { endPoints } from '../../constant'
import { Loader } from '../../UI'


const ViewProduct: React.FC = () => {
  const { productId } = useParams();
  const { status, data } = useFetch<ProductData>(`${endPoints.products}/${productId}`);

  if (status == "loading" || data === null) {
    return <Loader />
  }

  const { product } = data;
  console.log(product);
  

  return (
    <div className={style.product}>
      <div className={style.media}>

      </div>
      <div className={style.info}>
        <h2 className={style.productTitle}>{product.title}</h2>
        <p className={style.productDescription}>{product.description}</p>
      </div>
    </div>
  )
}

export default ViewProduct