import React from 'react';
import PropTypes from 'prop-types';

import usePagination from '../../../hooks/usePagination';

import './_index.scss';

const Pagination = ({
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  siblingCount
}) => {
  const paginationRange = usePagination({
    totalCount,
    pageSize,
    siblingCount,
    currentPage
  });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="pagination">
      <li
        className={'pagination__item' + (currentPage === 1 ? ' disabled' : '')}
        onClick={onPrevious}
      >
        <div className="pagination__arrow pagination__arrow--left"></div>
      </li>

      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === 'DOTS') {
          return (
            <li key={idx} className="pagination__dots">
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={idx}
            className={
              'pagination__item' +
              (pageNumber === currentPage ? ' selected' : '')
            }
            onClick={() => {
              onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={
          'pagination__item' + (currentPage === lastPage ? ' disabled' : '')
        }
        onClick={onNext}
      >
        <div className="pagination__arrow pagination__arrow--right"></div>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number
};

export default Pagination;
