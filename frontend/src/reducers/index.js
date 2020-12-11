import { combineReducers } from 'redux';
import {
  loadingNews,
  loadingNewsItem,
  loadingComment,
  updatingComments,
  errors,
} from './processesStateRedusers';
import { news, newsItem, comments } from './dataReducers';

export default combineReducers({
  loadingNews,
  loadingNewsItem,
  errors,
  loadingComment,
  updatingComments,
  news,
  newsItem,
  comments,
});
