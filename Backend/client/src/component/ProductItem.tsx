import React from 'react'
import { IconList } from '../UI'
import { converToMoney } from '../utility'
import { Link } from 'react-router-dom'
import { ProducItemData } from "../pages/Products"

const ProductItem: React.FC<ProducItemData> = ({ _id, images, title, price }) => {
    return (
        <Link to={_id} className='product'>
            <div className="product__container">
                <div className="product__image">
                    {
                        images.length
                            ? <img src={images[0]} alt={title} loading='lazy' />
                            : <IconList type='media' />
                    }
                </div>
                <div className="product__info">
                    <h2 className='sub-title product__info-title'>{title}</h2>
                    <span className='product__info-price body-text'>{converToMoney(price)}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem