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
      <div className="row">
        <div className="col-6">{i18n.t("noReturnMessage")}: <span className="w300">{stats.get('notRepliedCount')}</span></div>
        <div className="col-6">{i18n.t("totalArticles")}: <span className="w300">{stats.get('repliedCount') + stats.get('notRepliedCount')}</span></div>
        {typeof repliedArticleCount === 'number' && (
          <>
            <div className="col-6">
              {i18n.t("othersResponded")}: <span className="w300">{stats.get('repliedCount') - repliedArticleCount}</span> 
            </div>
            <div className="col-6">
              {i18n.t("whatYouRespondedTo")}: <span className="w300">{repliedArticleCount}</span>
            </div>
            <div className="col-6 ml-auto">
              <div className="progress">
                <i
                  style={{
                    width: `${(repliedArticleCount / stats.get('repliedCount')) *
                      100}%`,
                  }}
                />
              </div>
            </div>
            
          </>
        )}
        
      </div>
      <style jsx>{`
        .full-site-stat {
          font-size: 0.85rem;
          font-weight: 400;
          padding: .75rem;
          border-radius: 8px;
          border: 1px solid #CACED0;
          max-width: 400px;
          margin: 1rem 0;
        }
        @media screen and (min-width: 425px) {
          .full-site-stat {
            font-size: 1rem;
          }
        }
        @media screen and (min-width: 768px) {
          .full-site-stat {
            margin: 0;
          }
        }
        .full-site-stat div {
          line-height: 1.5em;
        }
        .progress {
          margin: 0.5rem 0 0;
          border: 1px solid #CACED0;
          padding: 1px;
          height: 8px;
          border-radius: 3px;
          background-color: white;
        }

        i {
          display: block;
          height: 100%;
          background: #F0B4D0;
        }
      `}</style>
    </div>
  );
}

export default FullSiteArticleStats;
