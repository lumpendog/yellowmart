import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getShoppingCart } from '../store/cart';
import { getCategoriesList } from '../store/categories';
import { getFurnitureList } from '../store/furniture';
import paginate from '../utils/paginate';
import sortCatalog from '../utils/sortCatalog';

const useShoppingCart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState({ path: 'price', order: 'asc' });
  const data = useSelector(getShoppingCart());
  const furniture = useSelector(getFurnitureList());
  const categories = useSelector(getCategoriesList());

  const itemsList = data.reduce((acc, el) => {
    const currentItemData = furniture.find((i) => i._id === el._id);
    if (currentItemData) {
      acc.push({
        ...currentItemData,
        category: categories.find((i) => i._id === el.category),
        quantity: el.quantity
      });
    }
    return acc;
  }, []);

  const itemsOnPage = 5;
  const sortingTypes = ['price', 'name']; // add sorting options here

  const handleSortClick = (item) => setSortBy(item);
  const handlePageChange = (num) => setCurrentPage(num);
  const handleFilterChange = (e) => {
    setFilter(e.value);
  };

  const filteredList = filter
    ? itemsList.filter((item) =>
        item.name.toLowerCase().includes(filter.toLowerCase())
      )
    : itemsList;
  const totalCount = filteredList.length;
  const sortedFurniture = sortCatalog(filteredList, sortBy.path, sortBy.order);
  const listCrop = paginate(sortedFurniture, currentPage, itemsOnPage);
  return {
    currentPage,
    handleSortClick,
    sortingTypes,
    totalCount,
    handlePageChange,
    handleFilterChange,
    sortBy,
    itemsOnPage,
    filter,
    listCrop
  };
};

export default useShoppingCart;
