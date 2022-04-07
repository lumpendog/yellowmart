import configFile from '../config.json';

const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';
const SHOPPING_CART_KEY = 'shopping-cart-data';

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = configFile.tokenExpirationTime
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}

export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}

export function setShoppingCart(data) {
  localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(data));
}

export function getShoppigCart() {
  if (localStorage.getItem(SHOPPING_CART_KEY) === null) setShoppingCart([]);
  return JSON.parse(localStorage.getItem(SHOPPING_CART_KEY));
}

export function removeShoppingCartData() {
  localStorage.removeItem(SHOPPING_CART_KEY);
}

const localStorageService = {
  setTokens,
  getRefreshToken,
  getTokenExpiresDate,
  getAccessToken,
  getUserId,
  removeAuthData,
  setShoppingCart,
  getShoppigCart,
  removeShoppingCartData
};

export default localStorageService;
