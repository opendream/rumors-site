import React from 'react';
import moment from 'moment';
import i18n from '../i18n';

export default function ArticleInfo({ article }) {
  const createdAt = moment(article.get('createdAt'));
  return (
    <div className="root">
      {createdAt.isValid() ? (
         <span title={createdAt.format('lll')}>&nbsp;•&nbsp; {createdAt.fromNow()}</span>
      ) : (
        ''
      )}
      <style jsx>{`
        .root {
          font-size: 90%;
          color: #9E9E9E;
        }
      `}</style>
    </div>
  );
}
