import React from 'react';
import moment from 'moment';
import i18n from '../i18n';

export default function ArticleInfo({ article }) {
  const createdAt = moment(article.get('createdAt'));
  return (
    <div className="root">
      {createdAt.isValid() ? (
        <span title={createdAt.format('lll')}>{createdAt.fromNow()}</span>
      ) : (
        ''
      )}
      <style jsx>{`
        .root {
          font-size: var(--font-size);
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
