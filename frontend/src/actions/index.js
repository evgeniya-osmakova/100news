import axios from 'axios';
import { createAction } from 'redux-actions';
import _ from 'lodash';

export const loadingNewsRequest = createAction('LOADING_NEWS_REQUEST');
export const loadingNewsSuccess = createAction('LOADING_NEWS_SUCCESS');
export const loadingNewsFailure = createAction('LOADING_NEWS_FAILURE');

export const loadingNewsItemRequest = createAction('LOADING_NEWS_ITEM_REQUEST');
export const loadingNewsItemSuccess = createAction('LOADING_NEWS_ITEM_SUCCESS');
export const loadingNewsItemFailure = createAction('LOADING_NEWS_ITEM_FAILURE');

export const loadingCommentsRequest = createAction('LOADING_COMMENT_REQUEST');
export const loadingCommentsSuccess = createAction('LOADING_COMMENT_SUCCESS');
export const loadingCommentsFailure = createAction('LOADING_COMMENT_FAILURE');

export const updatingCommentsRequest = createAction('UPDATING_COMMENT_REQUEST');
export const updatingCommentsSuccess = createAction('UPDATING_COMMENT_SUCCESS');
export const updatingCommentsFailure = createAction('UPDATING_COMMENT_FAILURE');

export const clearing = createAction('DATA_CLEAR');

const path = 'http://localhost:7000';
const timeout = 5000;
const loadingTimeout = 60000;

export const loadNews = () => async (dispatch) => {
  dispatch(loadingNewsRequest());
  try {
    const response = await axios.get(`${path}/news`, { timeout });
    const timer = setTimeout(() => loadNews()(dispatch), loadingTimeout);
    dispatch(loadingNewsSuccess({ allNews: response.data, timer }));
  } catch (err) {
    const timer = setTimeout(() => loadNews()(dispatch), loadingTimeout);
    dispatch(loadingNewsFailure({ err: err.message, timer }));
  }
};

export const loadComments = ({ kids }, { parentId }) => async (dispatch) => {
  dispatch(loadingCommentsRequest());
  try {
    const loadedComments = await Promise.all(kids.map(async (comment) => {
      const response = await axios.get(`${path}/item/${comment}`, { timeout });
      return response.data;
    }));
    dispatch(loadingCommentsSuccess({ commentsList: loadedComments, parentId }));
  } catch (err) {
    dispatch(loadingCommentsFailure({ err: err.message }));
  }
};

export const updateAllComments = ({ kids }, { parentId }, { comments }) => async (dispatch) => {
  dispatch(updatingCommentsRequest());
  try {
    await loadComments({ kids }, { parentId })(dispatch);
    const parentsIds = _.keys(comments);
    parentsIds.forEach((id) => {
      const children = comments[id].kids;
      if (children && id !== parentId) {
        loadComments({ kids: children }, { parentId: id })(dispatch);
      }
    });
    dispatch(updatingCommentsSuccess());
  } catch (err) {
    dispatch(updatingCommentsFailure({ err: err.message }));
  }
};

export const loadNewsItem = (id, comments) => async (dispatch) => {
  dispatch(loadingNewsItemRequest());
  try {
    const response = await axios.get(`${path}/item/${id}`, { timeout });
    const { kids } = response.data;
    if (kids) {
      await updateAllComments({ kids }, { parentId: id }, { comments })(dispatch);
    }
    const timer = setTimeout(() => loadNewsItem(id, comments)(dispatch), loadingTimeout);
    dispatch(loadingNewsItemSuccess({ updatedNewsItem: response.data, timer }));
  } catch (err) {
    const timer = setTimeout(() => loadNewsItem(id, comments)(dispatch), loadingTimeout);
    dispatch(loadingNewsItemFailure({ err: err.message, timer }));
  }
};
