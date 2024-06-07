import React from 'react'
import "./style.css"
import { PropsPagination } from "./type"
import { createArrayFromNumber } from '../../utility';
import Button from '../Button/Button';

const Pagination: React.FC<PropsPagination> = ({ maxPage, currentPage, type, onClick }) => {
    if (maxPage === currentPage ) {
        return <></>
    }
    return (
        <div className='pagination'>
            {
                createArrayFromNumber(maxPage).map(page => {
                    return (
                        <Button
                            onClick={onClick}
                            data-page={page}
                            typeButton='button'
                            cssSelector={`pagination-button outline-primary-button small-text ${page === currentPage ? "pagination-button--active" : ""}`}
                            key={`${type}-${page}`}
                        >
                            {page.toString()}
                        </Button>
                    )
                })
            }
        </div>
    )
}

export default Pagination