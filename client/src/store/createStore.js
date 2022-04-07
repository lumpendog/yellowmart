import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import cartReducer from './cart';
import categoriesReducer from './categories';
import furnitureReducer from './furniture';

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  furniture: furnitureReducer,
  cart: cartReducer
});

export function createStore() {
  return configureStore({ reducer: rootReducer });
}
