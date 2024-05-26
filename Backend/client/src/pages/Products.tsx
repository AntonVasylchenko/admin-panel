import React from 'react'
import { Pagination, FilterSelect } from '../UI'
import { useFetch } from '../hook'
import { buildUrl, endPoints, filterProduct } from '../constant'
import { ProductList } from '../component'
import { Link } from 'react-router-dom'

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
export type ProductsData = {
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
                [name]: value,
                page: 1
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

    const { status, data } = useFetch<ProductsData>(buildUrl(endPoints.products, filterValue));

    return (
        <div className='products'>
            <div className="products__container">
                <div className="products__controller">
                    <Link className='primary-button products__controller-button' to="create">Create new product</Link>
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
                {data && <ProductList status={status} products={data.products} />}
                {data &&
                    <Pagination
                        maxPage={data.maxPages}
                        currentPage={filterValue.page}
                        onClick={handlePagination}
                        type='product'
                    />
                }
            </div>
        </div>
    )
}
export default Products

