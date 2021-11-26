import {combineReducers} from "@reduxjs/toolkit";
import userReducer from '../modules/user/user-slice'
import articleReducer from '../modules/article/article-slice'
import appReducer from '../app-slice'
import commentsReducer from '../modules/comment/comments-slice'

const combinedReducers = combineReducers({
  user: userReducer,
  article: articleReducer,
  app: appReducer,
  comments: commentsReducer
});

export default combinedReducers;
