import React from 'react';
import PropTypes from 'prop-types';

import formatPrice from '../../../utils/formatPrice';
import Button from '../button';
import history from '../../../utils/history';
import { useSelector } from 'react-redux';
import { getCategoryById } from '../../../store/categories';

const CardSmall = ({ item }) => {
  const category = useSelector(getCategoryById(item.category));
  return (
    <div className="card-small">
      <div className="card-small__picture-box">
        <img
          className="card-small__img"
          src={item.picture || '/catalog/image_placeholder.png'}
          alt={`${item.name}`}
        />
      </div>
      <div className="card-small__text-content">
        <h2 className="card-small__title">{item.name}</h2>
        <p className="card-small__id">
          Catalog number: #{item.index}. Category: {category.name}
        </p>
        <p className="card-small__price">Price: {formatPrice(item.price)}</p>
      </div>
      <div className="card-small__button-box">
        <Button
          size="sm"
          content="Open card"
          onClick={() => history.push(`/catalog/${item._id}`)}
        />
      </div>
    </div>
  );
};

CardSmall.propTypes = {
  item: PropTypes.object.isRequired
};

export default CardSmall;
