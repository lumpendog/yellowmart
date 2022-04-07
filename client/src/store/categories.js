import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../services/category.service';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    categoriesRequestSend: (state) => {
      state.isLoading = true;
    },
    categoriesRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    categoriesRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const {
  categoriesRequestSend,
  categoriesRequestSuccess,
  categoriesRequestFail
} = actions;

const isOutdated = (date) => {
  return Date.now() - date > 10 * 60 * 1000;
};

export const loadCategoriesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().categories;
  if (isOutdated(lastFetch)) {
    dispatch(categoriesRequestSend());
    try {
      const { content } = await categoryService.fetchAll();
      dispatch(categoriesRequestSuccess(content));
    } catch (e) {
      dispatch(categoriesRequestFail(e.message));
    }
  }
};

export const getLoadingStatus = () => (state) => state.categories.isLoading;
export const getCategoriesList = () => (state) => state.categories.entities;
export const getCategoryById = (id) => (state) =>
  state.categories.entities.find((cat) => cat._id === id);

export default categoriesReducer;
