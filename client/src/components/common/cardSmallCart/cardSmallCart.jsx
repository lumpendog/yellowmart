import React from 'react';
import PropTypes from 'prop-types';

import formatPrice from '../../../utils/formatPrice';
import Button from '../button';
import { useDispatch } from 'react-redux';
import InputNumber from '../inputNumber';
import {
  decrementQuantity,
  incrementQuantity,
  removeItemFromShoppingCart
} from '../../../store/cart';

const CardSmallCart = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleDelete = (id) => {
    dispatch(removeItemFromShoppingCart(id));
  };

  return (
    <div className="card-small-cart">
      <div className="card-small-cart__picture-box">
        <img
          className="card-small-cart__img"
          src={item.picture}
          alt={`${item.name}`}
        />
      </div>
      <div className="card-small-cart__text-content">
        <h2 className="card-small-cart__title">{item.name}</h2>
        <p className="card-small-cart__id">
          Catalog number: #{item.index}. Category: {item.category}
        </p>
        <p className="card-small-cart__price">
          Price: {formatPrice(item.price)} ea. Total:{' '}
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
      <div className="card-small-cart__button-box">
        <InputNumber
          value={item.quantity}
          name="quantity"
          onIncrement={() => handleIncrement(item._id)}
          onDecrement={() => handleDecrement(item._id)}
          size="sm"
        />
        <Button
          size="sm"
          content="Delete"
          onClick={() => handleDelete(item._id)}
        />
      </div>
    </div>
  );
};

CardSmallCart.propTypes = {
  item: PropTypes.object.isRequired
};

export default CardSmallCart;
