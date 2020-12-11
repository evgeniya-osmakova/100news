import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const news = handleActions({
  [actions.loadingNewsSuccess](state, { payload: { allNews, timer } }) {
    return { allNews, timer };
  },
  [actions.loadingNewsFailure](state, { payload: { timer } }) {
    return { ...state, timer };
  },
}, { allNews: [], timer: null });

export const newsItem = handleActions({
  [actions.loadingNewsItemSuccess](state, { payload: { updatedNewsItem, timer } }) {
    return { ...state, currentNewsItemData: updatedNewsItem, timer };
  },
  [actions.loadingNewsItemFailure](state, { payload: { timer } }) {
    return { ...state, timer };
  },
  [actions.clearing](state) {
    return { ...state, currentNewsItemData: null };
  },
}, { currentNewsItemData: null, timer: null });

export const comments = handleActions({
  [actions.loadingCommentsSuccess](state, { payload: { commentsList, parentId } }) {
    return { ...state, [parentId]: commentsList };
  },
  [actions.clearing]() {
    return {};
  },
}, {});
