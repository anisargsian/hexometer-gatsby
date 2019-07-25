import React, { useState } from 'react';
import { PaginationPropsNew } from '../../types';
import { Button } from 'tabler-react';
import './index.css';
import { number, checkPropTypes } from 'prop-types';

const Pagination = ({ data, rowPerPage, currentPage, clicked, handlePageData }: PaginationPropsNew) => {
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState<Array<number>>([]);
    // const [displayPages, setDisplayPages] = useState<Array<number>>([]);

    const setPage = (current: number) => {
        const indexOfLastRow = current * rowPerPage;
        const indexOfFirstRow = indexOfLastRow - rowPerPage;
        return data.slice(indexOfFirstRow, indexOfLastRow);
    };

    const pagesCount = Math.ceil(data.length / rowPerPage);
    const totalPagesArray = Array.from({ length: pagesCount }, (v, k) => k + 1);
    let displayPagesArray: Array<number>;
    // default page size is 10
    const pageSize = 10;


    let startPage: number, endPage: number;

    if (pagesCount <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = pagesCount;
    } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        } else if (currentPage + 4 >= pagesCount) {
            startPage = pagesCount - 9;
            endPage = pagesCount;
        } else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, data.length - 1);
    displayPagesArray = totalPagesArray.slice(startIndex, endIndex + 1);

    const buttons = (
        <>
            {displayPagesArray.map((pg) => (
                <button
                    className={currentPage === pg ? "btn-primary" : "btn-secondary"}
                    key={pg}
                    onClick={() => {
                        clicked(pg);
                        handlePageData(setPage(pg))
                    }}
                >
                    {pg}
                </button>
            ))}
        </>
    )

    return (
        data.length && <ul>
            <Button
                disabled={currentPage === 1}
                onClick={() => {
                    clicked(1);
                    setPage(1)
                }}
            >
                First
            </Button>
            <Button
                disabled={currentPage === 1}
                onClick={() => {
                    clicked(currentPage -1);
                    setPage(currentPage - 1)}} >
                {'<'}
            </Button>
            {buttons}
            <Button
                disabled={currentPage === totalPagesArray[totalPagesArray.length - 1]}
                onClick={() => setPage(currentPage + 1)} >
                {'>'}
            </Button>
            <Button
                disabled={currentPage === totalPagesArray[totalPagesArray.length - 1]}
                onClick={() => setPage(totalPagesArray[totalPagesArray.length - 1])} >
                Last
            </Button>
        </ul>
    )
}

export default Pagination;