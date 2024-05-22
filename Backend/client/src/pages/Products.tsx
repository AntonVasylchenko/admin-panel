import React from 'react'
import { Button, FilterSelect } from '../UI'
import { useFetch } from '../hook'
import { buildUrl, endPoints, filterProduct } from '../constant'
import { ProductItem } from '../component'


type FilterType = {
    page: number,
    limit: number,
    sort: string,
    status: string
}

export type ProducItemData = {
    _id: string,
    title: string,
    price: number,
    images: string[],
    tags?: string[]
}
type ProductsData = {
    currentCount: number,
    currnetPage: string,
    maxPages: number,
    products: ProducItemData[],
    totalProduct: number
}

const Products: React.FC = () => {
    const [filterValue, setFilterValue] = React.useState<FilterType>({
        page: 1,
        limit: 12,
        sort: "none",
        status: "all"
    })

    const handleSort = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target;
        const { name, value } = target

        if (name == "sort" || name == "status") {
            setFilterValue(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }, [setFilterValue])

    const handlePagination = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const { dataset: { page } } = event.target as HTMLButtonElement;
        if (Number(page)) {
            setFilterValue(prev => ({
                ...prev,
                page: Number(page)
            }));
        }

    }, [setFilterValue])

    const { status, data } = useFetch(buildUrl(endPoints.products, filterValue));
    const productRespone = data as ProductsData;
    console.log(status);
    

    const createArrayFromNumber = (value: number): number[] => {
        return Array.from({ length: value }, (_v, i) => i + 1);
    }

    return (
        <div className='products'>
            <h2 className="products__title">Products</h2>
            <div className="products__container">
                <div className="products__controller">
                    <FilterSelect
                        type='sort-filter'
                        label='Sort by'
                        options={filterProduct.sort}
                        value={filterValue.sort}
                        onChange={handleSort}
                        name='sort'
                    />
                    <FilterSelect
                        type='status-filter'
                        label='Status by'
                        options={filterProduct.status}
                        value={filterValue.status}
                        onChange={handleSort}
                        name='status'
                    />

                </div>
                <div className='products__list'>
                    {productRespone.products && productRespone.products.map(product => {
                        return (
                            <ProductItem
                                key={product._id}
                                _id={product._id}
                                images={product.images}
                                title={product.title}
                                price={product.price}
                            />
                        )
                    })}

                </div>
                <div className='products__pagination'>
                    {
                        createArrayFromNumber(productRespone.maxPages).map(arrayItem => {
                            return (
                                <Button onClick={handlePagination} data-page={arrayItem} typeButton='button' cssSelector="products__pagination-button outline-primary-button small-text" key={`pagination-${arrayItem}`}>
                                    {arrayItem.toString()}
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Products

