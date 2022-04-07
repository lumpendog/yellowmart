import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFurnitureById } from '../../../store/furniture';
import CardLarge from '../../common/cardLarge';

const ItemBox = () => {
  const { itemId } = useParams();
  const currentItem = useSelector(getFurnitureById(itemId));

  return (
    <div className="item-page-container">
      <CardLarge item={currentItem} />
    </div>
  );
};

export default ItemBox;
