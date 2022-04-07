import React from 'react';
import PropTypes from 'prop-types';

import './_index.scss';

const Navbar = ({ items, onSelect, selectedItem, onClear }) => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        {Object.keys(items).map((key) => (
          <li
            key={items[key]._id}
            className={
              'navbar__item' + (selectedItem === items[key] ? ' selected' : '')
            }
            onClick={() => onSelect(items[key])}
          >
            {items[key].name}
          </li>
        ))}
        <li className="navbar__item navbar__item--clear" onClick={onClear}>
          Reset filter
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.objectOf(PropTypes.object)
  ]).isRequired,
  onSelect: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default Navbar;
