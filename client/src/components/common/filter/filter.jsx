import React from 'react';
import PropTypes from 'prop-types';
import Textfield from '../form/textfield';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <Textfield
      name="filter"
      value={filter}
      onChange={onFilterChange}
      placeholder="Filter items..."
    />
  );
};
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;
