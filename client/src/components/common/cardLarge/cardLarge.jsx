import React, { useState } from 'react';
import PropTypes from 'prop-types';

import formatPrice from '../../../utils/formatPrice';
import Button from '../button';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryById } from '../../../store/categories';
import InputNumber from '../inputNumber';
import { addItemToShoppingCart } from '../../../store/cart';

const CardLarge = ({ item }) => {
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const category = useSelector(getCategoryById(item.category));
  const dispatch = useDispatch();

  const handleIncrement = () => {
    setQuantityToAdd((prevState) => {
      if (prevState < item.quantity) return prevState + 1;
      return prevState;
    });
  };

  const handleDecrement = () => {
    setQuantityToAdd((prevState) => {
      if (prevState > 1) return prevState - 1;
      return prevState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addItemToShoppingCart({
        _id: item._id,
        quantity: quantityToAdd
      })
    );
    setQuantityToAdd(1);
  };

  return (
    <div className="card-large">
      <div className="card-large__picture-box">
        <img
          className="card-large__img"
          src={item.picture || '/catalog/image_placeholder.png'}
          alt={`${item.name}`}
        />
      </div>
      <div className="card-large__text-content">
        <h2 className="card-large__title">{item.name}</h2>
        <p className="card-large__id">
          Catalog number: #{item.index}. Category: {category.name}
        </p>
        <p className="card-large__about">{item.about}</p>
        <p className="card-large__quantity">
          Quantity in stock: {item.quantity}
        </p>
        <p className="card-large__price">Price: {formatPrice(item.price)}</p>
      </div>
      <form className="card-large__button-box" onSubmit={handleSubmit}>
        <InputNumber
          name="quantity"
          value={quantityToAdd}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          size="lg"
        />
        <Button size="lg" content="Add to cart" type="submit" />
      </form>
    </div>
  );
};

CardLarge.propTypes = {
  item: PropTypes.object.isRequired
};

export default CardLarge;
