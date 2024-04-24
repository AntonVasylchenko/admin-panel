import React from 'react'
import style from "./product-item.module.css"
import DefaultImage from "/image/default-image-product.png"
import { Link } from 'react-router-dom'

type ProductItemType = {
    obj: {
        _id: string,
        categories: string[],
        updatedAt: string,
        createdAt: string,
        description: string,
        images: string[],
        price: number,
        tags: string[],
        title: string
    }
}

const ProductItem: React.FC<ProductItemType> = ({ obj }) => {
    const featuredImage = obj.images.length != 0 ? obj.images[0] : DefaultImage;

    return (
        <div className={style["product-item"]}>
            <Link className={style["product-item__link"]} to={`/products/${obj._id}`}>
                <div className={style["product-item__link-image"]}>
                    <img src={featuredImage} alt={obj.title} loading='lazy' />
                </div>
                <h2 className={style["product-item__link-title"]}>{obj.title}</h2>

            </Link>
        </div>
    )
}

export default ProductItem