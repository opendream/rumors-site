import React from 'react';
import { Link } from '../routes';
import ArticleInfo from './ArticleInfo';
import ArticleTruthMeter from './ArticleTruthMeter/ArticleTruthMeter';
import { listItemStyle } from './ListItem.styles';
import ArticleItemWidget from './ArticleItemWidget/ArticleItemWidget.js';
import cx from 'classnames';
import i18n from '../i18n';

export default function ArticleItem({
  article,
  read = false, // from localEditorHelperList, it only provide after did mount
  notArticleReplied = false, // same as top
  handleLocalEditorHelperList,
  isLogin,
  replyConnections,
}) {
  const id = article.get('id');
  let articleCreator = null;
  if (article.get('user') != null) {
    articleCreator = article.get('user').get('name');
  }

  let replyAmount = 0;
  let outOfScopeReplyAmount = 0;
  let opinionReplyAmount = 0;
  if (replyConnections != null) {
    replyAmount = replyConnections.size;
    replyConnections.map(reply => {
      if (reply.get('reply').get('type') === 'NOT_ARTICLE')
        outOfScopeReplyAmount++;
      else if (reply.get('reply').get('type') === 'OPINIONATED')
        opinionReplyAmount++;
    });
  }

  return (
    <li
      className={cx('card mb-3', {
        read: read,
        'not-article': notArticleReplied,
      })}
    >
      <Link route="article" params={{ id }}>
        <a>
          {article.get('title') ? (
            <div className="card-header d-flex align-items-center mb-3">
              <div className="item-replyRequestCount mr-3">
                {article.get('replyRequestCount')} คนสงสัย
              </div>
              <div className="item-title">{article.get('title')}</div>
            </div>
          ) : (
            <div className="card-header bg-white d-flex align-items-center">
              <div className="item-replyRequestCount mr-3">
                {article.get('replyRequestCount')} คนสงสัย
              </div>
              <div className="item-text">{article.get('text')}</div>
            </div>
          )}

          <div className="card-body d-flex justify-content-between pt-0">
            <div className="card-body-left">
              {article.get('title') ? (
                <div className="item-text">{article.get('text')}</div>
              ) : (
                ``
              )}
              <div>
                {article.get('categories') ? (
                  <div className={`mt-1 mb-1`}>
                    {article.get('categories').map((item, i) => (
                      <span key={i} className="badge badge-primary mr-2">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  ``
                )}
              </div>
              {/*//TODO:: Style these please*/}
              <div className="d-flex">
                {articleCreator != null ? (
                  <div className="item-createBy mr-2">{articleCreator}</div>
                ) : null}

                {outOfScopeReplyAmount > 0 ? (
                  <div className="item-outOfScopeReplyAmount">
                    {outOfScopeReplyAmount} คนว่า ไม่อยู่ในขอบเขตการตรวจสอบ
                  </div>
                ) : null}

                {opinionReplyAmount > 0 ? (
                  <div className="item-opinionReplyAmount">
                    {opinionReplyAmount} คนว่า มีความเห็นส่วนตัว
                  </div>
                ) : null}

                <ArticleInfo article={article} />
                {isLogin && (
                  <ArticleItemWidget
                    id={id}
                    read={read}
                    notArticleReplied={notArticleReplied}
                    onChange={handleLocalEditorHelperList}
                  />
                )}
              </div>
            </div>

            <div className="card-body-right">
              <div className="d-flex flex-column align-items-center">
                <ArticleTruthMeter replyConnections={replyConnections} />

                {replyAmount > 0 ? (
                  <div className="item-replyAmount">
                    {replyAmount} {i18n.t('thenReply')}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </a>
      </Link>

      <style jsx>{listItemStyle}</style>
    </li>
  );
}
