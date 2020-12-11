import React, { useEffect } from 'react';
import _ from 'lodash';
import './News.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { loadNews } from '../../actions';
import NewsItemInList from './NewsItemInList';

function News() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { loadingNews } = useSelector((state) => state);

  const { newsErr: error } = useSelector((state) => state.errors);

  const { allNews } = useSelector((state) => state.news);

  useEffect(() => {
    loadNews()(dispatch);
  }, []);

  const updateNews = () => {
    loadNews()(dispatch);
  };

  return (
    <div className="news">
      <div className="news__update news-update">
        <div className="button news-update__text" onClick={updateNews}>{t('buttons.updateNews')}</div>
        {(error !== '')
          ? <div className="news-update__message news-update__message--warning">{error}</div>
          : <div className="news-update__message">{t(`messages.${loadingNews}`)}</div>
        }
      </div>
      <div className="news__list">
        {allNews.map((newsItem) => {
          if (newsItem) {
            return <NewsItemInList key={_.uniqueId()}
                            newsItem={newsItem} />;
          }
          return '';
        })}
      </div>
    </div>
  );
}

export default News;
