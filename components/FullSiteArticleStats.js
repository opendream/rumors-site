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
      {i18n.t("noReturnMessage")}： {stats.get('notRepliedCount')}
      <p>{i18n.t("totalArticles")}: {stats.get('repliedCount') + stats.get('notRepliedCount')}</p>
      {typeof repliedArticleCount === 'number' && (
        <div>
          <p>
            {i18n.t("othersResponded")}: {stats.get('repliedCount') - repliedArticleCount} /
            {i18n.t("whatYouRespondedTo")}: {repliedArticleCount}
          </p>
          <div className="progress">
            <i
              style={{
                width: `${(repliedArticleCount / stats.get('repliedCount')) *
                  100}%`,
              }}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        .full-site-stat {
          font-size: 12px;
        }
        .progress {
          border: 1px solid khaki;
          padding: 1px;
          height: 8px;
          border-radius: 3px;
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
