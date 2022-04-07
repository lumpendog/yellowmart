import React from 'react';

import Navbar from '../navbar';

import Pagination from '../../common/pagination';
import useCatalog from '../../../hooks/useCatalog';
import Filter from '../../common/filter';
import Sort from '../../common/sort';
import CardSmall from '../../common/cardSmall';

const Catalog = () => {
  const {
    currentPage,
    handleSortClick,
    handleCategorySelect,
    sortingTypes,
    totalCount,
    furnitureCrop,
    clearCategoryClear,
    handlePageChange,
    handleFilterChange,
    categories,
    selectedCategory,
    sortBy,
    itemsOnPage,
    filter
  } = useCatalog();

  return (
    <>
      <Navbar
        items={categories}
        onSelect={handleCategorySelect}
        selectedItem={selectedCategory}
        onClear={clearCategoryClear}
      />
      <div className="small-cards-container">
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <Sort
          selectedSort={sortBy}
          onSort={handleSortClick}
          sortingTypes={sortingTypes}
        />
        {furnitureCrop.map((currentItem) => (
          <CardSmall key={currentItem._id} item={currentItem} />
        ))}
      </div>
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={itemsOnPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Catalog;
