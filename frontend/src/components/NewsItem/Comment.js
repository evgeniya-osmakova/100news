import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { loadComments } from '../../actions';

const Comment = ({ comment, renderComments }) => {
  Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    renderComments: PropTypes.func.isRequired,
  };

  const {
    by,
    text,
    time,
    kids,
    id,
    deleted,
  } = comment;

  const { comments, loadingComment } = useSelector((state) => state);

  const { commentsErr } = useSelector((state) => state.errors);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const loadChildren = (children, parentId) => (e) => {
    e.preventDefault();
    loadComments({ kids: children }, { parentId })(dispatch);
  };

  if (deleted) {
    return '';
  }
  return (
    <div className="comment">
      <div className="comment__header comment-header">
        <div className="item-data__author">Commented by
          <span className="data-author">{by}</span>
        </div>
        <div className="item-data__date">{moment(time * 1000).format('MMMM Do YYYY, h:mm:ss a')}</div>
      </div>
      <div className="comment__body comment__text">{text}</div>
      <div className="sub-comment">
        {kids && !_.has(comments, id)
          ? <>
            <div className="button comment__btn" onClick={loadChildren(kids, id)}>{t('buttons.loadComments')}</div>
            {(commentsErr !== '' && loadingComment !== 'finished')
              ? <div className="news-update__message news-update__message--warning">{commentsErr}</div>
              : <div className="news-update__message">{t(`messages.${loadingComment}`)}</div>
            }
          </>
          : ''
        }

        {kids && _.has(comments, id)
          // eslint-disable-next-line no-use-before-define
          ? renderComments(id)
          : '' }
      </div>
    </div>
  );
};

export default Comment;
