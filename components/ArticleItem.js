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
  const articleCreator = article.get('user').get('name');
  const replyAmount = replyConnections.size;

  return (
    <li
      className={cx('item', {
        read: read,
        'not-article': notArticleReplied,
      })}
    >
      <Link route="article" params={{ id }}>
        <a>
          {/*//TODO:: Change to localization key*/}
          <div className="item-replyRequestCount">
            {article.get('replyRequestCount')} คนสงสัย
          </div>

          {article.get('title') ? (
            <div className="item-title">{article.get('title')}</div>
          ) : (
            ``
          )}
          <div className="item-text">{article.get('text')}</div>
          {/*//TODO:: Style these please*/}
          <div className="item-createBy">{articleCreator}</div>
          {replyAmount > 0 ? (
            <div className="item-replyAmount">
              {replyAmount} {i18n.t('thenReply')}
            </div>
          ) : null}
          {article.get('categories') ? (
            <div className={`mt-1 mb-1`}>
              {article.get('categories').map((item, i) => (
                <span key={i} className="badge badge-secondary mr-2">
                  {item}
                </span>
              ))}
            </div>
          ) : (
            ``
          )}
          {/*<ArticleTruthMeter replyConnections={replyConnections} />*/}
          <ArticleInfo article={article} />
          {isLogin && (
            <ArticleItemWidget
              id={id}
              read={read}
              notArticleReplied={notArticleReplied}
              onChange={handleLocalEditorHelperList}
            />
          )}
        </a>
      </Link>

      <style jsx>{listItemStyle}</style>
    </li>
  );
}
