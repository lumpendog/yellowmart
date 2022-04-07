import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';
import _ from 'lodash';

const Sort = ({ selectedSort, onSort, sortingTypes }) => {
  const UP_TRIANGLE = '▲';
  const DOWN_TRIANGLE = '▼';

  const handleSort = (item) => {
    if (selectedSort.path === item && selectedSort.order === 'asc') {
      onSort({ path: item, order: 'desc' });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderButtonText = (type, currentSelectedSort) => {
    let result = _.upperFirst(type);
    if (currentSelectedSort.path === type) {
      result += ' ';
      result +=
        currentSelectedSort.order === 'asc' ? UP_TRIANGLE : DOWN_TRIANGLE;
    }
    return result;
  };
  return (
    <div className="sort-container">
      <h2 className="sort-container__h2">Sort by:</h2>
      {sortingTypes.map((item) => (
        <Button
          key={item}
          size="sm"
          content={renderButtonText(item, selectedSort)}
          onClick={() => handleSort(item)}
        />
      ))}
    </div>
  );
};
Sort.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired,
  sortingTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Sort;
