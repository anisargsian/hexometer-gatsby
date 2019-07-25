import React, { useState, useEffect } from 'react';
import { Button } from "tabler-react";
// import { PaginationProps } from "../../types";
import "./index.css";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumber] = useState([]);

  const { rowPerPage, data } = props;

  const setPage = (current) => {
    const indexOfLastRow = current * rowPerPage;
    const indexOfFirstRow = indexOfLastRow - rowPerPage;
    return data.slice(indexOfFirstRow, indexOfLastRow);
  };

  useEffect(() => {
    setCurrentPage(1);

    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(data.length / rowPerPage); i++) {
      pageNumber.push(i);
    }
    setPageNumber(pageNumber);
    props.onClick(setPage(1));
  }, [data]);

  let prevBtnDisabled = currentPage <= 1;
  const btnPrevClick = () => {
    if (currentPage - 1 >= 1) setCurrentPage(currentPage - 1);
    props.onClick(setPage(currentPage - 1));
  };

  let nextBtnDisabled = currentPage >= pageNumbers.length;
  const btnNextClick = () => {
    if (currentPage + 1 <= pageNumbers.length) setCurrentPage(currentPage + 1);
    props.onClick(setPage(currentPage + 1));
  };

  return (
    <ul className="margin-center">
      {data.length !== 0 &&
        <Button
          disabled={prevBtnDisabled}
          onClick={btnPrevClick}
        >{'<'}</Button>
      }
      {pageNumbers.map((number) => (
        <button
          className={currentPage === number ? "btn-primary" : "btn-secondary"}
          key={number}
          id={number}
          onClick={(e) => {
            const inputText = Number(e.target.id);
            setCurrentPage(inputText);
            props.onClick(setPage(inputText));
          }}
        >
          {number}
        </button>
      ))}
      {data.length !== 0 &&
        <Button
          disabled={nextBtnDisabled}
          onClick={btnNextClick}
        >{'>'}</Button>
      }
    </ul>
  )
};

export default Pagination;
