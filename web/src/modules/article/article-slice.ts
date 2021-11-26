import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import {ApiInstance} from "../../services/api";
import {Article, ArticleForm, InitialState, Filter } from "./interfaces";

const initialState: InitialState = {
  article: {
    id: 0,
    title: '',
    text: '',
    category: '',
    created_at: '',
    author: ''
  },
  list: [],
}

const article = createSlice({
  name: 'article',
  initialState: initialState,
  reducers: {
    setArticle: (state, action: PayloadAction<Article>) => {
      state.article = action.payload
      return state
    },
    setList: (state, action: PayloadAction<Array<Article>>) => {
      state.list = action.payload
      return state
    }
  }
});

export const {
  setArticle,
  setList
} = article.actions;

export const getArticlesList = (filter?: Filter) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.article.get('/list', filter)
      dispatch(setList(res))
      return res;
    } catch (e) {
      console.warn("ERR", e)
    }
  }
}

export const getArticle = (id: number) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.article.get(`${id}`)
      dispatch(setArticle(res))
    } catch (e) {
      console.warn("ERR", e)
    }
  }
};

export const createArticle = (data: ArticleForm) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.article.post('', data)
      console.log("RES", res)
      return res;
    } catch (e) {
      console.warn("ERR", e)
    }
  }
}

export default article.reducer;
