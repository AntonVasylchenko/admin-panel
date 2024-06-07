import React from 'react'
import style from "./style.module.css"
import { FilterType, ProductsData } from "./type"

import { Pagination, FilterSelect } from '../../UI'
import { useFetch } from '../../hook'
import { endPoints, filterProduct } from '../../constant'
import { ProductList } from '../../component'
import { Link } from 'react-router-dom'
import { buildUrl, createClasses } from '../../utility'

const Products: React.FC = () => {
    const [filterValue, setFilterValue] = React.useState<FilterType>({
        page: 1,
        limit: 12,
        sort: "none",
        status: "all"
    })

    const handleSort = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const target = event.target as HTMLSelectElement;
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
        <div className={style.products}>
            <div className={style.products__container}>
                <div className={style.products__controller}>
                    <Link
                        className={createClasses(style.products__controller_button, 'primary-button')}
                        to="create"
                    >
                        Create new product
                    </Link>
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

