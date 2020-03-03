import React from 'react';
import { Link } from '../routes';
import ArticleInfo from './ArticleInfo';
import { listItemStyle } from './ListItem.styles';
import ArticleItemWidget from './ArticleItemWidget/ArticleItemWidget.js';
import cx from 'classnames';

export default function ArticleItem({
  article,
  read = false, // from localEditorHelperList, it only provide after did mount
  notArticleReplied = false, // same as top
  handleLocalEditorHelperList,
  isLogin,
}) {
  const id = article.get('id');
  return (
    <li
      className={cx('item', {
        read: read,
        'not-article': notArticleReplied,
      })}
    >
      <Link route="article" params={{ id }}>
        <a>
          <div className="item-text">{article.get('text')}</div>
          {article.get('categories')?
          <div className={`mt-1 mb-1`}>
            {article.get('categories').map(item =>
            <span className="badge badge-secondary mr-2">{item}</span>
            )}
          </div>
          : ``}
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
