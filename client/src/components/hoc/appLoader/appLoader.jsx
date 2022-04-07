import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoadingStatus as getAuthIsLoading,
  loadCurrentUser
} from '../../../store/auth';
import {
  getLoadingStatus as getCartLoadingStatus,
  loadShoppingCart
} from '../../../store/cart';
import {
  getLoadingStatus as getCategoriesLoadingStatus,
  loadCategoriesList
} from '../../../store/categories';
import {
  getLoadingStatus as getFurnitureLoadingStatus,
  loadFurnitureList
} from '../../../store/furniture';
import Loader from '../../common/loader';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthLoading = useSelector(getAuthIsLoading());
  const isCategoriesLoading = useSelector(getCategoriesLoadingStatus());
  const isFurnitureLoading = useSelector(getFurnitureLoadingStatus());
  const isCartLoading = useSelector(getCartLoadingStatus());

  useEffect(() => {
    dispatch(loadCurrentUser());
    dispatch(loadCategoriesList());
    dispatch(loadFurnitureList());
    dispatch(loadShoppingCart());
  }, []);

  if (
    isAuthLoading ||
    isCategoriesLoading ||
    isFurnitureLoading ||
    isCartLoading
  ) {
    return <Loader />;
  }

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
