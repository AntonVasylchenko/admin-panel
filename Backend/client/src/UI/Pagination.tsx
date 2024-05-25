import React from 'react'
import { createArrayFromNumber } from '../utility';
import Button from './Button';


type PropsPagination = {
    maxPage: number,
    currentPage: number,
    type: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}
const Pagination: React.FC<PropsPagination> = ({ maxPage, currentPage, type, onClick }) => {
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