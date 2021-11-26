import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../../app/store";
import {ApiInstance} from "../../services/api";

interface Comment {
  text: string
}

interface InitialState {
  list: Array<Comment>
}

const initialState: InitialState = {
  list: []
}

const comments = createSlice({
  name: 'comments',
  initialState: initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Array<Comment>>) => {
      state.list = action.payload
      return state
    },
  }
});

export const {
  setComments,
} = comments.actions;

export const getComments = (article_id: number) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    try {
      const res = await api.comment.get(article_id.toString())
      dispatch(setComments(res))
    } catch (e) {
      console.warn("ERR", e)
    }
  }
};

export const createComment = (text: string) => {
  return async (dispatch: AppDispatch, getState: any, api: ApiInstance) => {
    const {user} = getState().user
    const {article} = getState().article
    const data = {
      user_id: user.id,
      article_id: article.id,
      text
    }
    try {
      const res = await api.comment.post('', data)
      await dispatch(getComments(res.article_id))
    } catch (e) {
      console.warn("ERROR", e)
    }
  }
};

export default comments.reducer;
