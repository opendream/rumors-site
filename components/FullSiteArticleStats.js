import React from 'react';
import i18n from '../i18n';

/**
 * @param {Map} props.stats
 * @param {number} props.stats.repliedCount
 * @param {number} props.stats.notRepliedCount
 * @param {number} props.stats.repliedArticleCount
 */
function FullSiteArticleStats({ stats, repliedArticleCount }) {
  if (!stats) return null;

  return (
    <div className="full-site-stat">
      <div>{i18n.t("noReturnMessage")}: <strong>{stats.get('notRepliedCount')}</strong></div>
      <div>{i18n.t("totalArticles")}: <strong>{stats.get('repliedCount') + stats.get('notRepliedCount')}</strong></div>
      {typeof repliedArticleCount === 'number' && (
        <>
          <div>
            {i18n.t("othersResponded")}: <strong>{stats.get('repliedCount') - repliedArticleCount}</strong> / {i18n.t("whatYouRespondedTo")}: <strong>{repliedArticleCount}</strong>
          </div>
          <div className="progress">
            <i
              style={{
                width: `${(repliedArticleCount / stats.get('repliedCount')) *
                  100}%`,
              }}
            />
          </div>
        </>
      )}
      <style jsx>{`
        .full-site-stat {
          font-size: 12px;
          padding: .75rem;
          border-radius: .25rem;
          border: 1px solid rgba(0,0,0,0.3);
        }
        .progress {
          border: 1px solid khaki;
          padding: 1px;
          height: 8px;
          border-radius: 3px;
          background-color: white;
        }

        i {
          display: block;
          height: 100%;
          background: khaki;
        }
      `}</style>
    </div>
  );
}

export default FullSiteArticleStats;
