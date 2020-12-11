import reducers from './index';
import * as actions from '../actions';

describe('loadingNews', () => {
  const initialState = { loadingNews: 'notLoaded' };

  it('should change request status to "requested"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsRequest, payload: {} },
      ).loadingNews,
    ).toEqual('requested');
  });

  it('should change request status to "finished"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsSuccess, payload: {} },
      ).loadingNews,
    ).toEqual('finished');
  });

  it('should change request status to "failed"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsFailure, payload: {} },
      ).loadingNews,
    ).toEqual('failed');
  });
});

describe('loadingNewsItem', () => {
  const initialState = { loadingNewsItem: 'notLoaded' };

  it('should change request status to "requested"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsItemRequest, payload: {} },
      ).loadingNewsItem,
    ).toEqual('requested');
  });

  it('should change request status to "finished"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsItemSuccess, payload: {} },
      ).loadingNewsItem,
    ).toEqual('finished');
  });

  it('should change request status to "failed"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsItemFailure, payload: {} },
      ).loadingNewsItem,
    ).toEqual('failed');
  });
});

describe('loadingComment', () => {
  const initialState = { loadingComment: 'notLoaded' };

  it('should change request status to "requested"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingCommentsRequest, payload: {} },
      ).loadingComment,
    ).toEqual('requested');
  });

  it('should change request status to "finished"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingCommentsSuccess, payload: {} },
      ).loadingComment,
    ).toEqual('finished');
  });

  it('should change request status to "failed"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingCommentsFailure, payload: {} },
      ).loadingComment,
    ).toEqual('failed');
  });
});

describe('updatingComments', () => {
  const initialState = { updatingComments: 'notLoaded' };

  it('should change request status to "requested"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.updatingCommentsRequest, payload: {} },
      ).updatingComments,
    ).toEqual('requested');
  });

  it('should change request status to "finished"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.updatingCommentsSuccess, payload: {} },
      ).updatingComments,
    ).toEqual('finished');
  });

  it('should change request status to "failed"', () => {
    expect(
      reducers(
        initialState,
        { type: actions.updatingCommentsFailure, payload: {} },
      ).updatingComments,
    ).toEqual('failed');
  });
});

describe('errors', () => {
  const initialState = { errors: { newsErr: '', newsItemErr: '', commentsErr: '' } };

  it('should add newsErr', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsFailure, payload: { err: 'err' } },
      ).errors,
    ).toEqual({ newsErr: 'err', newsItemErr: '', commentsErr: '' });
  });

  it('should clear newsErr', () => {
    expect(
      reducers(
        { errors: { newsErr: 'err', newsItemErr: '', commentsErr: '' } },
        { type: actions.loadingNewsRequest, payload: {} },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: '' });
  });

  it('should add newsItemErr', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingNewsItemFailure, payload: { err: 'err' } },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: 'err', commentsErr: '' });
  });

  it('should clear newsItemErr', () => {
    expect(
      reducers(
        { errors: { newsErr: '', newsItemErr: 'err', commentsErr: '' } },
        { type: actions.loadingNewsItemRequest, payload: {} },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: '' });
  });

  it('should add commentsErr - 1', () => {
    expect(
      reducers(
        initialState,
        { type: actions.loadingCommentsFailure, payload: { err: 'err' } },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: 'err' });
  });

  it('should clear commentsErr - 1', () => {
    expect(
      reducers(
        { errors: { newsErr: '', newsItemErr: '', commentsErr: 'err' } },
        { type: actions.loadingCommentsRequest, payload: {} },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: '' });
  });

  it('should add commentsErr - 2', () => {
    expect(
      reducers(
        initialState,
        { type: actions.updatingCommentsFailure, payload: { err: 'err' } },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: 'err' });
  });

  it('should clear commentsErr - 2', () => {
    expect(
      reducers(
        { errors: { newsErr: '', newsItemErr: '', commentsErr: 'err' } },
        { type: actions.updatingCommentsRequest, payload: {} },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: '' });
  });

  it('should clear all err', () => {
    expect(
      reducers(
        { errors: { newsErr: 'err', newsItemErr: 'err', commentsErr: 'err' } },
        { type: actions.clearing, payload: {} },
      ).errors,
    ).toEqual({ newsErr: '', newsItemErr: '', commentsErr: '' });
  });
});
