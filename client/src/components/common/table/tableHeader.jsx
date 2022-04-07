import React from 'react';
import PropTypes from 'prop-types';

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const UP_TRIANGLE = '▲';
  const DOWN_TRIANGLE = '▼';

  const handleSort = (item) => {
    if (selectedSort.path === item && selectedSort.order === 'asc') {
      onSort({ path: item, order: 'desc' });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };
  const renderArrow = (currentPath, currentSelectedSort) => {
    if (currentPath === currentSelectedSort.path) {
      return currentSelectedSort.order === 'asc' ? (
        <i className="up-triangle">{UP_TRIANGLE}</i>
      ) : (
        <i className="down-triangle">{DOWN_TRIANGLE}</i>
      );
    }
    return null;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            role={columns[column].path && 'button'}
            scope="col"
          >
            {columns[column].name}
            {renderArrow(columns[column].path, selectedSort)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableHeader;
