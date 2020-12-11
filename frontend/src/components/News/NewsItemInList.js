import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const NewsItemInList = ({ newsItem }) => {
  NewsItemInList.propTypes = {
    newsItem: PropTypes.object.isRequired,
  };

  const {
    title,
    score,
    by,
    time,
    id,
    deleted,
  } = newsItem;

  const { timer } = useSelector((state) => state.news);

  useEffect(() => () => clearTimeout(timer), []);

  if (deleted) {
    return '';
  }

  return (
    <Link className="item-data" to={`/${id}`}>
      <div className="item-data__title">{title}</div>
      <div className="item-data__author">Added by
        <span className="data-author">{by}</span>
      </div>
      <div className="item-data__date">{moment(time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</div>
      <div className="item-data__info">score: {score}</div>
    </Link>
  );
};

export default NewsItemInList;
