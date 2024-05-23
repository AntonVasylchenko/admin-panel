import React from 'react'


const ProductItemFake: React.FC = () => {
    return (
        <div className='product-fake'>
            <div className="product-fake__container">
                <div className="product-fake__image">
                </div>
                <div className="product-fake__info">
                    <h2 className='product-fake__info-title'></h2>
                    <span className="product-fake__info-price"></span>
                </div>
            </div>
        </div>
    )
}

export default ProductItemFake