import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import './NewsItem.scss';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { loadNewsItem } from '../../actions';
import * as allActions from '../../actions';
import Comment from './Comment';

function NewsItem() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { newsItemId } = useParams();

  const { loadingNewsItem, comments, updatingComments } = useSelector((state) => state);

  const { newsItemErr } = useSelector((state) => state.errors);

  const { currentNewsItemData, timer } = useSelector((state) => state.newsItem);

  useEffect(() => {
    if (loadingNewsItem === 'notLoaded') {
      loadNewsItem(newsItemId, comments)(dispatch);
    }
  }, []);

  const renderComments = (rootId) => {
    const rootComments = comments[rootId];
    if (rootComments) {
      return rootComments.map((comment) => <Comment key={_.uniqueId()}
        comment={comment} renderComments={renderComments} />);
    }
    return '';
  };

  const updateComments = () => {
    loadNewsItem(newsItemId, comments)(dispatch);
  };

  const onBackClick = () => {
    clearTimeout(timer);
    dispatch(allActions.clearing());
  };

  if (_.isEmpty(currentNewsItemData)) {
    if (loadingNewsItem === 'failed') {
      return (
        <>
          <Link className="news-item-page__btn button" to={'/'} onClick={onBackClick} >{t('buttons.back')}</Link>
          <div className="news-update__message loading">{t(`messages.${loadingNewsItem}`)}</div>
          <div className="comments-update">
            <div className="button" onClick={updateComments}>{t('buttons.updateComments')}</div>
            {(newsItemErr !== '')
              ? <div className="news-update__message news-update__message--warning">{newsItemErr}</div>
              : <div className="news-update__message">{t(`messages.${updatingComments}`)}</div>
            }
          </div>
        </>
      );
    }
    return (
      <>
        <Link className="news-item-page__btn button" to={'/'} onClick={onBackClick} >{t('buttons.back')}</Link>
        <div className="news-update__message loading">{t(`messages.${loadingNewsItem}`)}</div>
      </>
    );
  }
  return (
    <div className="news-item-page">
      <Link className="news-item-page__btn button" to={'/'} onClick={onBackClick} >{t('buttons.back')}</Link>
      <div className="news-item-page__data item-data">
        <div className="item-data__title">{currentNewsItemData.title}</div>
        <a className="item-data__link" href={currentNewsItemData.url}
           target="_blank" rel="noreferrer">{currentNewsItemData.url}</a>
        <div className="item-data__author">Added by
          <span className="data-author">{currentNewsItemData.by}</span>
        </div>
        <div className="item-data__date">{moment(currentNewsItemData.time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</div>
        <div className="item-data__info">{currentNewsItemData.descendants} comments</div>
      </div>

      <div className="news-item-page__comments">
        <div className="comments-update">
          <div className="button" onClick={updateComments}>{t('buttons.updateComments')}</div>
          {(newsItemErr !== '')
            ? <div className="news-update__message news-update__message--warning">{newsItemErr}</div>
            : <div className="news-update__message">{t(`messages.${updatingComments}`)}</div>
          }
        </div>
        {renderComments(newsItemId)}
      </div>
    </div>
  );
}

export default NewsItem;
