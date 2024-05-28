import React from 'react'
import { PropsProductItem } from "./type"
import style from "./style.module.css";

import { IconList } from '../../UI'
import { converToMoney } from '../../utility'
import { Link } from 'react-router-dom'

const ProductItem: React.FC<PropsProductItem> = ({ _id, images, title, price }) => {
    return (
        <Link to={_id} className={style.product}>
            <div className={style.product__container}>
                <div className={style.product__image}>
                    {
                        images.length
                            ? <img src={images[0]} alt={title} loading='lazy' />
                            : <IconList type='media' />
                    }
                </div>
                <div className={style.product__info}>
                    <h2 className='sub-title'>{title}</h2>
                    <span className='body-text'>{converToMoney(price)}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem