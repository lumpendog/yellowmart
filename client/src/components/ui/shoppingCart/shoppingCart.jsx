import React from 'react';
import useShoppingCart from '../../../hooks/useShoppingCart';
import CardSmallCart from '../../common/cardSmallCart';
import Filter from '../../common/filter';
import Pagination from '../../common/pagination';
import CartSummary from '../cartSummary';

const ShoppingCart = () => {
  const {
    listCrop,
    totalCount,
    currentPage,
    itemsOnPage,
    handlePageChange,
    filter,
    handleFilterChange
  } = useShoppingCart();

  return (
    <>
      <div className="shopping-cart-container">
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        {listCrop.map((item) => (
          <CardSmallCart key={item._id} item={item} />
        ))}
      </div>
      <div className="cart-summary-container">
        <CartSummary />
      </div>
      <div className="pagination-container">
        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={itemsOnPage}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default ShoppingCart;
