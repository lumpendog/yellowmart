import React from 'react';
import useAdminCatalog from '../../../hooks/useAdminCatalog';
import Filter from '../../common/filter';
import Pagination from '../../common/pagination';
import FurnitureTable from '../furnitureTable';

const AdminCatalog = () => {
  const {
    handleSortClick,
    sortBy,
    furnitureCrop,
    filter,
    handleFilterChange,
    totalCount,
    currentPage,
    itemsOnPage,
    handlePageChange
  } = useAdminCatalog();

  return (
    <div className="admin-catalog">
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <FurnitureTable
        onSort={handleSortClick}
        selectedSort={sortBy}
        furniture={furnitureCrop}
      />
      <Pagination
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={itemsOnPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AdminCatalog;
