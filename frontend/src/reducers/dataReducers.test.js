import reducers from './index';
import * as actions from '../actions';

describe('news', () => {
  const initialState = { news: { allNews: [], timer: null } };

  it('should add allNews', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsSuccess, payload: { allNews: [123, 125], timer: 'newTimer' } },
      ).news,
    ).toEqual({
      allNews: [123, 125],
      timer: 'newTimer',
    });
  });

  it('should add timer', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsFailure, payload: { timer: 'newTimer' } },
      ).news,
    ).toEqual({
      allNews: [],
      timer: 'newTimer',
    });
  });
});

describe('newsItem', () => {
  const initialState = { newsItem: { currentNewsItemData: null, timer: null } };

  it('should add news item data & timer', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsItemSuccess, payload: { updatedNewsItem: {}, timer: 'newTimer' } },
      ).newsItem,
    ).toEqual({ currentNewsItemData: {}, timer: 'newTimer' });
  });

  it('should add timer', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsItemFailure, payload: { timer: 'newTimer' } },
      ).newsItem,
    ).toEqual({ currentNewsItemData: null, timer: 'newTimer' });
  });

  it('should return initialState', () => {
    expect(
      reducers(
        initialState,
        { type: actions.clearing, payload: {} },
      ).newsItem,
    ).toEqual({ currentNewsItemData: null, timer: null });
  });
});

describe('comments', () => {
  const initialState = { comments: {} };

  it('should add new comment', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingCommentsSuccess, payload: { commentsList: {}, parentId: 123 } },
      ).comments,
    ).toEqual({ 123: {} });
  });

  it('should return initialState', () => {
    expect(
      reducers(
        initialState,
        { type: actions.clearing, payload: {} },
      ).comments,
    ).toEqual({});
  });
});
