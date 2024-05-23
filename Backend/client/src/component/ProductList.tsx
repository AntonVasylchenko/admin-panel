import React from 'react'
import { ProducItemData } from "./../pages/Products"
import { ProductItem, ProductItemFake } from './../component/index'
import { createArrayFromNumber } from '../utility'



type Props = {
    status: 'loading' | 'success' | 'error';
    products: ProducItemData[];
};

const ProductList: React.FC<Props> = ({ status, products = [] }) => {
    const renderLoading = () =>
        createArrayFromNumber(12).map((_item, index) => (
            <ProductItemFake key={`product-fake-${index}`} />
        ));

    const renderSuccess = () =>
        products.map((product) => (
            <ProductItem
                key={product._id}
                _id={product._id}
                images={product.images}
                title={product.title}
                price={product.price}
            />
        ));

    const renderError = () => <div>Not found</div>;

    const renderContent = () => {
        switch (status) {
            case 'loading':
                return renderLoading();
            case 'success':
                return renderSuccess();
            case 'error':
                return renderError();
            default:
                return null;
        }
    };

    return <div className="products__list">{renderContent()}</div>;
};

export default ProductList;
