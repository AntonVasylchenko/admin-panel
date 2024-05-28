import React from 'react'
import style from "./style.module.css"

const ProductItemFake: React.FC = () => {
    return (
        <div className={style.product_fake}>
            <div className={style.product_fake__container}>
                <div className={style.product_fake__image}>
                </div>
                <div className={style.product_fake__info}>
                    <h2 className={style.product_fake__info_title}></h2>
                    <span className={style.product_fake__info_price}></span>
                </div>
            </div>
        </div>
    )
}

export default ProductItemFake