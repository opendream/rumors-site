import React from 'react';
import moment from 'moment';
import i18n from '../i18n';

export default function ArticleInfo({ article }) {
  const createdAt = moment(article.get('createdAt'));
  return (
    <div className="root">
      {article.get('replyRequestCount')} {i18n.t("return")}
      {article.get('replyCount') > 0 ? (
        <span>・{article.get('replyCount')} {i18n.t("thenReply")}</span>
      ) : (
        ''
      )}
      {createdAt.isValid() ? (
        <span title={createdAt.format('lll')}>・{createdAt.fromNow()}</span>
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
