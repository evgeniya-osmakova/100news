import axios from 'axios';
import _ from 'lodash';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('loadNews', () => {
  const newsData = [
    {
      by: 'dhouston',
      descendants: 71,
      id: 123,
      kids: [
        9224,
        8917,
      ],
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    }, {
      by: 'abc',
      descendants: 10,
      id: 111,
      kids: [
        434,
        135,
      ],
      score: 100,
      time: 1175414200,
      title: 'For every cycle a HW engineer saves, a SW engineer will add two instructions',
      type: 'story',
      url: 'https://fabiensanglard.net/silicone/',
    },
  ];

  it('returns data when loadNews is called', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://127.0.0.1:7000/news').reply(200, newsData);

    const expectedActions = [
      actions.loadingNewsRequest(),
      actions.loadingNewsSuccess(
        {
          allNews: newsData,
          timer: 4,
        },
      ),
    ];
    const initialState = { allNews: [], timer: null };
    const store = mockStore(initialState);

    await store.dispatch(actions.loadNews());
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('loadComments', () => {
  const commentId1 = _.uniqueId();
  const commentId2 = _.uniqueId();

  const comment1 = {
    by: 'norvig',
    id: commentId1,
    kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
    parent: 2921506,
    text: 'For every cycle a HW engineer saves, a SW engineer will add two instructions',
    time: 1314211127,
    type: 'comment',
  };

  const comment2 = {
    by: 'norvig',
    id: commentId2,
    kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
    parent: 2921506,
    text: 'For every cycle a HW engineer saves, a SW engineer will add two instructions',
    time: 1314211127,
    type: 'comment',
  };

  it('returns data when loadComments is called', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`http://127.0.0.1:7000/item/${commentId1}`).reply(200, comment1);
    mock.onGet(`http://127.0.0.1:7000/item/${commentId2}`).reply(200, comment2);

    const parentId = _.uniqueId();

    const expectedActions = [
      actions.loadingCommentsRequest(),
      actions.loadingCommentsSuccess(
        {
          commentsList: [comment1, comment2],
          parentId,
        },
      ),
    ];
    const initialState = { comments: {} };
    const store = mockStore(initialState);

    await store.dispatch(actions.loadComments({ kids: [commentId1, commentId2] }, { parentId }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('loadNewsItem', () => {
  const newsItemId1 = _.uniqueId();
  const comments = {};

  it('returns data when loadNewsItem is called', async () => {
    const newsItemData = {
      by: 'dhouston',
      descendants: 71,
      id: newsItemId1,
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    };
    const mock = new MockAdapter(axios);
    mock.onGet(`http://127.0.0.1:7000/item/${newsItemId1}`).reply(200, newsItemData);

    const expectedActions = [
      actions.loadingNewsItemRequest(),
      actions.loadingNewsItemSuccess(
        {
          updatedNewsItem: newsItemData,
        },
      ),
    ];
    const initialState = { updatedNewsItem: null, timer: null };
    const store = mockStore(initialState);

    await store.dispatch(actions.loadNewsItem(newsItemId1, comments));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
    expect(store.getActions()[1].type).toEqual(expectedActions[1].type);
    expect(store.getActions()[1].payload.updatedNewsItem)
      .toEqual(expectedActions[1].payload.updatedNewsItem);
  });

  it('returns data when loadNewsItem is called (with kids)', async () => {
    const kidsId1 = _.uniqueId();

    const newsItemData = {
      by: 'dhouston',
      descendants: 71,
      id: newsItemId1,
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'story',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
      kids: [kidsId1],
    };

    const itemData = {
      by: 'dhouston',
      descendants: 71,
      id: kidsId1,
      score: 104,
      time: 1175714200,
      title: 'My YC app: Dropbox - Throw away your USB drive',
      type: 'comment',
      url: 'http://www.getdropbox.com/u/2/screencast.html',
    };

    const mock = new MockAdapter(axios);
    mock.onGet(`http://127.0.0.1:7000/item/${newsItemId1}`).reply(200, newsItemData);
    mock.onGet(`http://127.0.0.1:7000/item/${kidsId1}`).reply(200, itemData);

    const expectedActions = [
      actions.loadingNewsItemRequest(),
      actions.updatingCommentsRequest(),
      actions.loadingCommentsRequest(),
      actions.loadingCommentsSuccess(
        {
          commentsList: [itemData],
          parentId: newsItemId1,
        },
      ),
      actions.updatingCommentsSuccess(),
      actions.loadingNewsItemSuccess(
        {
          updatedNewsItem: newsItemData,
        },
      ),
    ];
    const initialState = { updatedNewsItem: null, timer: null };
    const store = mockStore(initialState);

    await store.dispatch(actions.loadNewsItem(newsItemId1, comments));
    expect(store.getActions()[0]).toEqual(expectedActions[0]);
    expect(store.getActions()[1]).toEqual(expectedActions[1]);
    expect(store.getActions()[2]).toEqual(expectedActions[2]);
    expect(store.getActions()[3]).toEqual(expectedActions[3]);
    expect(store.getActions()[4]).toEqual(expectedActions[4]);
    expect(store.getActions()[5].type).toEqual(expectedActions[5].type);
    expect(store.getActions()[5].payload.updatedNewsItem)
      .toEqual(expectedActions[5].payload.updatedNewsItem);
  });
});
