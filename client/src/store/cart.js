import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/local.storage.service';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    entities: localStorageService.getShoppigCart(),
    error: null,
    isLoading: true
  },
  reducers: {
    cartRequestSend: (state) => {
      state.isLoading = true;
    },
    cartRequestSuccess: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    cartRequestFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    cartChangeRequestSuccess: (state, action) => {
      state.entities = action.payload;
    }
  }
});

const cartChangeRequestSend = createAction('cart/cartChangeRequestSend');
const cartChangeRequestFail = createAction('cart/cartChangeRequestFail');

const { reducer: cartReducer, actions } = cartSlice;
const {
  cartRequestSuccess,
  cartRequestFail,
  cartRequestSend,
  cartChangeRequestSuccess
} = actions;

export const loadShoppingCart = () => (dispatch, getState) => {
  dispatch(cartRequestSend());
  try {
    const data = localStorageService.getShoppigCart();
    dispatch(cartRequestSuccess(data));
  } catch (e) {
    dispatch(cartRequestFail(e.message));
  }
};

export const addItemToShoppingCart = (item) => (dispatch, getState) => {
  dispatch(cartChangeRequestSend());
  const currentShoppingCart = getState().cart.entities;
  const newShoppingCart = [...currentShoppingCart];
  const existingItemIndex = currentShoppingCart.findIndex(
    (elem) => elem._id === item._id
  );
  if (existingItemIndex === -1) {
    newShoppingCart.push(item);
  } else {
    const newItem = { ...newShoppingCart[existingItemIndex] };
    newItem.quantity += item.quantity;
    newShoppingCart[existingItemIndex] = newItem;
  }
  try {
    localStorageService.setShoppingCart(newShoppingCart);
    dispatch(cartChangeRequestSuccess(newShoppingCart));
  } catch (e) {
    dispatch(cartChangeRequestFail(e.message));
  }
};

export const removeItemFromShoppingCart = (id) => (dispatch, getState) => {
  dispatch(cartChangeRequestSend());
  const currentShoppingCart = getState().cart.entities.filter(
    (item) => item._id !== id
  );
  try {
    localStorageService.setShoppingCart(currentShoppingCart);
    dispatch(cartChangeRequestSuccess(currentShoppingCart));
  } catch (e) {
    dispatch(cartChangeRequestFail(e.message));
  }
};

export const incrementQuantity = (id) => (dispatch, getState) => {
  dispatch(cartChangeRequestSend());
  const currentShoppintCart = getState().cart.entities;
  const newShoppingCart = [...currentShoppintCart];
  const quantityInStock = getState().furniture.entities.find(
    (item) => item._id === id
  ).quantity;
  const itemIndex = newShoppingCart.findIndex((item) => item._id === id);
  if (newShoppingCart[itemIndex].quantity < quantityInStock) {
    newShoppingCart[itemIndex] = {
      ...newShoppingCart[itemIndex],
      quantity: newShoppingCart[itemIndex].quantity + 1
    };
  }
  try {
    localStorageService.setShoppingCart(newShoppingCart);
    dispatch(cartChangeRequestSuccess(newShoppingCart));
  } catch (e) {
    dispatch(cartChangeRequestFail());
  }
};

export const decrementQuantity = (id) => (dispatch, getState) => {
  dispatch(cartChangeRequestSend());
  const currentShoppintCart = getState().cart.entities;
  const newShoppingCart = [...currentShoppintCart];
  const itemIndex = newShoppingCart.findIndex((item) => item._id === id);
  if (newShoppingCart[itemIndex].quantity > 1) {
    newShoppingCart[itemIndex] = {
      ...newShoppingCart[itemIndex],
      quantity: newShoppingCart[itemIndex].quantity - 1
    };
  }
  try {
    localStorageService.setShoppingCart(newShoppingCart);
    dispatch(cartChangeRequestSuccess(newShoppingCart));
  } catch (e) {
    dispatch(cartChangeRequestFail());
  }
};

export const clearShoppingCart = () => (dispatch) => {
  dispatch(cartChangeRequestSend());
  try {
    localStorageService.removeShoppingCartData();
    dispatch(cartRequestSuccess([]));
  } catch (e) {
    dispatch(cartChangeRequestFail(e.message));
  }
};

export const getLoadingStatus = () => (state) => state.cart.isLoading;
export const getShoppingCart = () => (state) => state.cart.entities;
export const getShoppingCartTotalData = () => (state) => {
  return state.cart.entities.reduce(
    (acc, item) => {
      // Check if item is still in catalog
      const currentItemData = state.furniture.entities.find(
        (el) => el._id === item._id
      );
      acc.totalSum += currentItemData
        ? currentItemData?.price * item.quantity
        : 0;
      acc.totalQuantity += currentItemData ? 1 : 0;
      return acc;
    },
    { totalQuantity: 0, totalSum: 0 }
  );
};

export default cartReducer;
