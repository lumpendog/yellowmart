import React from 'react';
import Table from '../../common/table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategoriesList } from '../../../store/categories';
import Button from '../../common/button';
import history from '../../../utils/history';
import { deleteFurniture } from '../../../store/furniture';
import formatPrice from '../../../utils/formatPrice';

const FurnitureTable = ({ furniture, onSort, selectedSort }) => {
  const categories = useSelector(getCategoriesList());
  const dispatch = useDispatch();

  const handleEdit = (item) => {
    history.push(`/admin/catalog/${item._id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteFurniture(id));
  };

  const columns = {
    index: {
      path: 'index',
      name: '#',
      component: (item) => <Link to={`/catalog/${item._id}`}>{item.index}</Link>
    },
    name: {
      path: 'name',
      name: 'Name'
    },
    category: {
      path: 'category',
      name: 'Category',
      component: (item) =>
        categories.find((cat) => cat._id === item.category).name
    },
    price: {
      path: 'price',
      name: 'Price',
      component: (item) => formatPrice(item.price)
    },
    quantity: { path: 'quantity', name: 'Quantity' },
    edit: {
      name: '',
      component: (item) => (
        <Button
          size="xs"
          content="..."
          onClick={() => {
            handleEdit(item);
          }}
        />
      )
    },
    delete: {
      name: '',
      component: (item) => (
        <Button
          size="xs"
          content="X"
          onClick={() => {
            handleDelete(item._id);
          }}
        />
      )
    }
  };
  return (
    <Table
      columns={columns}
      onSort={onSort}
      data={furniture}
      selectedSort={selectedSort}
    />
  );
};

FurnitureTable.propTypes = {
  furniture: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired
};

export default FurnitureTable;
