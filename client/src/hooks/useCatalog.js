import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getCategoriesList } from '../store/categories';
import { getFurnitureList } from '../store/furniture';
import paginate from '../utils/paginate';
import sortCatalog from '../utils/sortCatalog';

const useCatalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'price', order: 'asc' });

  const furniture = useSelector(getFurnitureList());
  const categories = useSelector(getCategoriesList());

  const itemsOnPage = 4;
  const sortingTypes = ['price', 'name']; // add sorting options here

  const handleSortClick = (item) => setSortBy(item);
  const handleCategorySelect = (item) => {
    setSelectedCategory(item);
    setFilter('');
    setCurrentPage(1);
  };
  const clearCategoryClear = () => {
    setSelectedCategory(null);
    setFilter('');
    setCurrentPage(1);
  };
  const handlePageChange = (num) => setCurrentPage(num);
  const handleFilterChange = (e) => {
    setFilter(e.value);
  };

  const filteredByCategoryFurniture = selectedCategory
    ? furniture.filter((item) => item.category === selectedCategory._id)
    : furniture;
  const filteredFurniture = filter
    ? filteredByCategoryFurniture.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : filteredByCategoryFurniture;
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
  };
};

export default useCatalog;
