import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array(totalPages).fill().map((_, index) => index + 1)

  return (
    <ul className="pagination">
      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`cursor-pointer shadow-md ${page === currentPage ? 'flex items-center justify-center rounded-full w-[50px] h-[50px] bg-[#E47143] text-white' : 'bg-white flex items-center justify-center text-black w-[50px] h-[50px] rounded-full bg-[#FAF9F9]'}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
