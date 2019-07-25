import React, { useState, useEffect } from 'react';
import { Button } from "tabler-react";
import { ServerSidePaginationProps } from "../../types";
import "./index.css";

const ServerSidePagination = (props: ServerSidePaginationProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumber] = useState<Array<number>>([]);
  const [pages, setPages] = useState<Array<number>>([2, 3, 4]);

  const { data, total } = props;

  useEffect(() => {
    setCurrentPage(1);
    props.onPageNum(1);
    setPageNumber(Array.from({ length: total % 100 === 0 ? total / 100 : total / 100 + 1 }, (v, k) => k + 1));
  }, [total]);


  let prevBtnDisabled = currentPage <= 1;
  const btnPrevClick = () => {
    if (currentPage - 1 >= 1) setCurrentPage(currentPage - 1);
    props.onPageNum(currentPage - 1);
    if (currentPage === pageNumbers.length && pages[pages.length - 1] !== pageNumbers.length - 1) {
      setPages([pageNumbers.length - 3, pageNumbers.length - 2, pageNumbers.length - 1])
    }
    if (currentPage === pages[0] && currentPage !== 2) {
      setPages(Array.from(pages, x => x - 1));
    }
  };

  let nextBtnDisabled = currentPage >= pageNumbers.length;
  const btnNextClick = () => {
    if (currentPage + 1 <= pageNumbers.length) setCurrentPage(currentPage + 1);
    props.onPageNum(currentPage + 1);
    if (currentPage === 1 && pages[0] !== 2) {
      setPages([2, 3, 4]);
    }
    if (currentPage === pages[pages.length - 1] && currentPage !== pageNumbers[pageNumbers.length - 2]) {
      setPages(Array.from(pages, x => x + 1))
    }
  };

  const handlePageNumberClick = (pageNum: number) => () => {
    setCurrentPage(pageNum);
    props.onPageNum(pageNum);
  };

  let buttons = (
    <>
      <button
        className={currentPage === 1 ? "btn-primary" : "btn-secondary"}
        key={1}
        onClick={handlePageNumberClick(1)}
      >
        {1}
      </button>
      {pages[0] === 2 ? null : <span>...</span>}
      {pages.map((number: number) => (
        <button
          className={currentPage === number ? "btn-primary" : "btn-secondary"}
          key={number}
          onClick={handlePageNumberClick(number)}
        >
          {number}
        </button>
      ))}
      {pages[pages.length - 1] === pageNumbers.length - 1 ? null : <span>...</span>}
      <button
        className={currentPage === pageNumbers.length ? "btn-primary" : "btn-secondary"}
        key={pageNumbers.length}
        onClick={handlePageNumberClick(pageNumbers.length)}
      >
        {pageNumbers.length}
      </button>
    </>
  );

  if (pageNumbers.length < 10) {
    buttons = (
      <>
        {pageNumbers.map((number: number) => (
          <button
            className={currentPage === number ? "btn-primary" : "btn-secondary"}
            key={number}
            onClick={handlePageNumberClick(number)}
          >
            {number}
          </button>
        ))}
      </>
    )
  }

  return (
    <ul className="margin-center">
      {data.length > 10}
      {data.length !== 0 &&
        <Button
          disabled={prevBtnDisabled}
          onClick={btnPrevClick}
        >{'<'}</Button>
      }

      {data.length !== 0 && buttons}

      {data.length !== 0 &&
        <Button
          disabled={nextBtnDisabled}
          onClick={btnNextClick}
        >{'>'}</Button>
      }
    </ul>
  )
};

export default ServerSidePagination;
