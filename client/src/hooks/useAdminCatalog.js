import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategoriesList } from '../store/categories';
import { getFurnitureList } from '../store/furniture';
import paginate from '../utils/paginate';
import sortCatalog from '../utils/sortCatalog';

const useAdminCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'index', order: 'asc' });

  const furniture = useSelector(getFurnitureList());
  const categories = useSelector(getCategoriesList());

  const itemsOnPage = 12;

  const handleSortClick = (item) => setSortBy(item);

  const handlePageChange = (num) => setCurrentPage(num);
  const handleFilterChange = (e) => {
    setFilter(e.value);
  };

  const filteredFurniture = filter
    ? furniture.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : furniture;
  const totalCount = filteredFurniture.length;
  const sortedFurniture = sortCatalog(
    filteredFurniture,
    sortBy.path,
    sortBy.order
  );

  const furnitureCrop = paginate(sortedFurniture, currentPage, itemsOnPage);
  return {
    currentPage,
    handleSortClick,
    totalCount,
    furnitureCrop,
    handlePageChange,
    handleFilterChange,
    categories,
    sortBy,
    itemsOnPage,
    filter
  };
};

export default useAdminCatalog;
