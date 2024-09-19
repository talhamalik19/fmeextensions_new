import { useState } from 'react';

export default function Pagination({ totalPages, currentPage, nextText, prevText, onPageChange }) {
    const [startPage, setStartPage] = useState(1);

    const handleNext = () => {
        if (currentPage >= startPage + 2 && currentPage < totalPages) {
            setStartPage(startPage + 1);
        }
        onPageChange(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage <= startPage && currentPage > 1) {
            setStartPage(startPage - 1);
        }
        onPageChange(currentPage - 1);
    };

    const handlePageChange = (page) => {
        if (page >= startPage && page <= startPage + 2) {
            onPageChange(page);
        } else if (page < startPage) {
            setStartPage(page);
            onPageChange(page);
        } else if (page > startPage + 2) {
            setStartPage(page - 2);
            onPageChange(page);
        }
    };

    const handleForward = () => {
        if (currentPage + 5 <= totalPages) {
            setStartPage(currentPage + 1);
            onPageChange(currentPage + 5);
        }
    };

    const handleBackward = () => {
        if (currentPage - 5 >= 1) {
            setStartPage(Math.max(1, currentPage - 5));
            onPageChange(Math.max(1, currentPage - 5));
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = startPage; i <= Math.min(startPage + 4, totalPages); i++) {
            if (i != totalPages) {
                pageNumbers.push(
                    <li key={i} className={`pag_count ${i === currentPage ? 'active' : ''}`}>
                        <button className={`pag_count ${i === currentPage ? 'Mui-selected' : ''}`} onClick={() => handlePageChange(i)}>{i}</button>
                    </li>
                );
            }
        }
        return pageNumbers;
    };

    return (
        <>
            <div class="pagination">
                <div class="MuiBox-root css-0">
                    <nav aria-label="pagination navigation">
                        <ul class="MuiPagination-ul flex flex-wrap">
                            <li className='prev pag_btn'>
                                <button className='' onClick={handlePrev} disabled={currentPage === 1}></button>
                            </li>

                            {startPage > 1 && <li className='pag_count'>
                                <button onClick={() => handlePageChange(1)}>{1}</button>
                            </li>}

                            {startPage > 1 && (
                                <li className='pag_count'>
                                    <button onClick={handleBackward}>...</button>
                                </li>
                            )}

                            {renderPageNumbers()}

                            {startPage + 2 < totalPages && (
                                <li className='pag_count'>
                                    <button onClick={handleForward}>...</button>
                                </li>
                            )}

                            <li className='pag_count'>
                                <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
                            </li>

                            <li className='next pag_btn'>
                                <button onClick={handleNext} disabled={currentPage === totalPages}></button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}
