import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { AppDispatch } from "./app/store";
import { ApiInstance } from "./services/api";

interface Category {
  name: string
}

interface InitialState {
  categories: Array<Category>
}

const initialState: InitialState = {
  categories: []
}

const app = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Array<Category>>) => {
      state.categories = action.payload
      return state
    },
  }
});

export const {
  setCategories,
} = app.actions;

export const getCategories = () => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.category.get()
      dispatch(setCategories(res))
    } catch (e) {
      console.warn("ERR", e)
    }
  }
};

export default app.reducer;
