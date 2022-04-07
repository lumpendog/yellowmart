import { createAction, createSlice } from '@reduxjs/toolkit';
import furnitureService from '../services/furniture.service';

const furnitureSlice = createSlice({
  name: 'furniture',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    furnitureRequestSend: (state) => {
      state.isLoading = true;
    },
    furnitureRequestSuccess: (state, action) => {
      state.isLoading = false;
      state.entities = action.payload;
    },
    furnitureRequestFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    furnitureDeleteRequestSuccess: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item._id !== action.payload
      );
    },
    furnitureDeleteRequestFail: (state, action) => {
      state.error = action.payload;
    },
    furnitureAddRequestSuccess: (state, action) => {
      state.entities = [...state.entities, action.payload];
    },
    furnitureAddRequestFail: (state, action) => {
      state.error = action.payload;
    },
    furnitureSaveRequestSuccess: (state, action) => {
      const itemIndex = state.entities.findIndex(
        (i) => i._id === action.payload._id
      );
      state.entities[itemIndex] = action.payload;
    },
    furnitureSaveRequestFail: (state, action) => {
      state.error = action.payload;
    }
  }
});

const furnitureDeleteRequestSend = createAction(
  'furniture/furnitureDeleteRequestSend'
);
const furnitureAddRequestSend = createAction(
  'furniture/furnitureAddRequestSend'
);
const furnitureSaveRequestSend = createAction(
  'furniture/furnitureSaveRequestSend'
);

const { reducer: furnitureReducer, actions } = furnitureSlice;
const {
  furnitureRequestSend,
  furnitureRequestSuccess,
  furnitureRequestFail,
  furnitureDeleteRequestSuccess,
  furnitureDeleteRequestFail,
  furnitureAddRequestFail,
  furnitureAddRequestSuccess,
  furnitureSaveRequestSuccess,
  furnitureSaveRequestFail
} = actions;

const isOutdated = (date) => {
  return Date.now() - date > 10 * 60 * 1000;
};

export const loadFurnitureList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().furniture;
  if (isOutdated(lastFetch)) {
    dispatch(furnitureRequestSend());
    try {
      const { content } = await furnitureService.fetchAll();
      dispatch(furnitureRequestSuccess(content));
    } catch (e) {
      dispatch(furnitureRequestFail(e.message));
    }
  }
};

export const addFurniture = (payload) => async (dispatch) => {
  dispatch(furnitureAddRequestSend());
  try {
    const { content } = await furnitureService.create(payload);
    dispatch(furnitureAddRequestSuccess(content));
  } catch (error) {
    dispatch(furnitureAddRequestFail(error.message));
  }
};

export const saveFurniture = (payload) => async (dispatch) => {
  dispatch(furnitureSaveRequestSend());
  try {
    const { content } = await furnitureService.patch(payload);
    dispatch(furnitureSaveRequestSuccess(content));
  } catch (error) {
    dispatch(furnitureSaveRequestFail(error.message));
  }
};

export const deleteFurniture = (id) => async (dispatch) => {
  dispatch(furnitureDeleteRequestSend());
  try {
    const { content } = await furnitureService.delete(id);
    if (!content) {
      dispatch(furnitureDeleteRequestSuccess(id));
    }
  } catch (error) {
    dispatch(furnitureDeleteRequestFail(error.message));
  }
};

export const getLoadingStatus = () => (state) => state.furniture.isLoading;
export const getFurnitureList = () => (state) => state.furniture.entities;
export const getFurnitureById = (id) => (state) =>
  state.furniture.entities.find((item) => item._id === id);

export default furnitureReducer;
