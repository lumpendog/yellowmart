import { createSlice } from '@reduxjs/toolkit';
import authService from '../services/auth.service';
import localStorageService from '../services/local.storage.service';
import userService from '../services/user.service';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
  ? {
      user: null,
      isLoading: true,
      error: null,
      isLogin: true
    }
  : {
      user: null,
      isLoading: false,
      error: null,
      isLogin: false
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authRequestSend: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    authRequestFail: (state, action) => {
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isLogin = false;
    },
    userDataRequestSend: (state) => {
      state.isLoading = true;
    },
    userDataRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    userDataRequestFail: (state, action) => {
      state.error = action.payload;
    },
    userUpdateRequestSend: (state) => {
      state.isLoading = true;
    },
    userUpdateRequestSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    userUpdateRequestFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: authReducer, actions } = authSlice;
const {
  authRequestSend,
  authRequestSuccess,
  authRequestFail,
  userLogout,
  userDataRequestSend,
  userDataRequestSuccess,
  userDataRequestFail,
  userUpdateRequestSend,
  userUpdateRequestSuccess,
  userUpdateRequestFail
} = actions;

export const login = (payload, redirect) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequestSend());
  try {
    const data = await authService.login(email, password);
    localStorageService.setTokens(data);
    const { content } = await userService.getCurrentUser();
    dispatch(authRequestSuccess(content));
    history.push(redirect);
  } catch (error) {
    dispatch(authRequestFail(error.message));
  }
};

export const logout = () => (dispatch) => {
  localStorageService.removeAuthData();
  localStorageService.removeShoppingCartData();
  dispatch(userLogout());
  history.push('/');
};

export const register = (payload) => async (dispatch) => {
  dispatch(authRequestSend());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    const { content } = await userService.getCurrentUser();
    dispatch(authRequestSuccess(content));
    history.push('/');
  } catch (error) {
    dispatch(authRequestFail(error.message));
  }
};

export const loadCurrentUser = () => async (dispatch, getState) => {
  dispatch(userDataRequestSend());
  try {
    if (getState().auth.isLogin) {
      const { content } = await userService.getCurrentUser();
      return dispatch(userDataRequestSuccess(content));
    }
    return dispatch(userDataRequestSuccess(null));
  } catch (error) {
    dispatch(userDataRequestFail(error.message));
  }
};

export const updateUser = (userData) => async (dispatch) => {
  dispatch(userUpdateRequestSend());
  try {
    const { content } = await userService.update(userData);
    dispatch(userUpdateRequestSuccess(content));
  } catch (error) {
    dispatch(userUpdateRequestFail(error.message));
  }
};

export const getLoginStatus = () => (state) => state.auth.isLogin;
export const getLoadingStatus = () => (state) => state.auth.isLoading;
export const getUserData = () => (state) => state.auth.user;

export default authReducer;
