import React from 'react'
import { useLoaderData } from 'react-router-dom';
import style from "./product.module.css"
import { ProductItem } from '../../component';
import { Button } from '../../ui';

type ProductsType = {
    [key:string]: {
        _id: string,
        categories: string[],
        updatedAt: string,
        createdAt: string,
        description: string,
        images: string[],
        price: number,
        tags:string[],
        title: string
    }[]
}


const Products:React.FC = () => {
const {products} = useLoaderData() as ProductsType ;
  return (
    <div className={style["product-grid"]}>
        <Button link={true} path='/create-product' cssSelector={style["product-grid__link"]} >Create product</Button>
        {
            products.map( product => {
                return (
                    <ProductItem key={product._id} obj={product}/>
                )
            })
        }
    </div>
  )
}

export default Products