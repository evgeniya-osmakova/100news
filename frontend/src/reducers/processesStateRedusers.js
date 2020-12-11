import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const loadingNews = handleActions({
  [actions.loadingNewsRequest]() {
    return 'requested';
  },
  [actions.loadingNewsSuccess]() {
    return 'finished';
  },
  [actions.loadingNewsFailure]() {
    return 'failed';
  },
}, 'notLoaded');

export const loadingNewsItem = handleActions({
  [actions.loadingNewsItemRequest]() {
    return 'requested';
  },
  [actions.loadingNewsItemSuccess]() {
    return 'finished';
  },
  [actions.loadingNewsItemFailure]() {
    return 'failed';
  },
  [actions.clearing]() {
    return 'notLoaded';
  },
}, 'notLoaded');

export const loadingComment = handleActions({
  [actions.loadingCommentsRequest]() {
    return 'requested';
  },
  [actions.loadingCommentsSuccess]() {
    return 'finished';
  },
  [actions.loadingCommentsFailure]() {
    return 'failed';
  },
}, 'notLoaded');

export const updatingComments = handleActions({
  [actions.updatingCommentsRequest]() {
    return 'requested';
  },
  [actions.updatingCommentsSuccess]() {
    return 'finished';
  },
  [actions.updatingCommentsFailure]() {
    return 'failed';
  },
}, 'notLoaded');

export const errors = handleActions({
  [actions.loadingNewsFailure](state, { payload: { err } }) {
    return { ...state, newsErr: err };
  },
  [actions.loadingNewsRequest](state) {
    return { ...state, newsErr: '' };
  },
  [actions.loadingNewsItemFailure](state, { payload: { err } }) {
    return { ...state, newsItemErr: err };
  },
  [actions.loadingNewsItemRequest](state) {
    return { ...state, newsItemErr: '' };
  },
  [actions.loadingCommentsFailure](state, { payload: { err } }) {
    return { ...state, commentsErr: err };
  },
  [actions.updatingCommentsFailure](state, { payload: { err } }) {
    return { ...state, commentsErr: err };
  },
  [actions.updatingCommentsRequest](state) {
    return { ...state, commentsErr: '' };
  },
  [actions.loadingCommentsRequest](state) {
    return { ...state, commentsErr: '' };
  },
  [actions.clearing]() {
    return { newsErr: '', newsItemErr: '', commentsErr: '' };
  },
}, { newsErr: '', newsItemErr: '', commentsErr: '' });
