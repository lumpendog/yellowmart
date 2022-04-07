import React, { useState } from 'react';

import './_index.scss';

const SearchBox = () => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = ({ target }) => {
    setSearchText(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchText);
  };

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-box__input"
        placeholder="Search"
        onChange={handleInputChange}
        value={searchText}
      />
      <button type="submit" className="search-box__button">
        Find
      </button>
    </form>
  );
};

export default SearchBox;
