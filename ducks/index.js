import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import thunk from 'redux-thunk';

import articleList from './articleList';
import replyList from './replyList';
import userList from './userList';
import tagList from './tagList';
import articleDetail from './articleDetail';
import replyDetail from './replyDetail';
import editArticleDetail from "./editArticleDetail";
import auth from './auth';

const reducers = combineReducers({
  articleList,
  replyList,
  userList,
  tagList,
  articleDetail,
  replyDetail,
  auth,
  editArticleDetail,
});

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export default function makeStore(initialState) {
  return createStore(reducers, initialState, enhancer);
}
