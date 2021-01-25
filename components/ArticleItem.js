import React from 'react';
import { Link } from '../routes';
import ArticleInfo from './ArticleInfo';
import ArticleTruthMeter from './ArticleTruthMeter/ArticleTruthMeter';
import { listItemStyle } from './ListItem.styles';
import ArticleItemWidget from './ArticleItemWidget/ArticleItemWidget.js';
import cx from 'classnames';
import i18n from '../i18n';
import FlaggedReplyInfomation from './FlaggedReplyInfomation';
import CalcDegreeFromReply from './CalcDegreeFromReply';

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
  if (replyConnections != null)
    replyAmount = replyConnections.filter(
      r =>
        r.get('reply').get('type') == 'NOT_RUMOR' ||
        r.get('reply').get('type') == 'RUMOR_NOT_RUMOR' ||
        r.get('reply').get('type') == 'RUMOR'
    ).size;

  let meterDegree = CalcDegreeFromReply(replyConnections);


  let renderText = article.get('text')
  let isMedia = true

  if (renderText.startsWith('$image__')) {
    const fileId = renderText.split('__')[2]
    renderText = <img className={`image-content mb-2`} src={`https://drive.google.com/uc?id=${fileId}`} style={{maxHeight: 300, maxWidth: '100%'}} />
  } else if (renderText.startsWith('$video')) {
    const fileId = renderText.split('__')[2]
    renderText = (
      <div className={`position-relative d-inline-block`}>
        <video style={{maxHeight: 300, maxWidth: '100%'}}>
          <source src={`https://drive.google.com/uc?id=${fileId}`} />
        </video>
        <div className={`position-absolute video-play-icon`}>
          ►
        </div>
        <style jsx>{`
          .video-play-icon {
            color: #FFF;
            top: 50%;
            left: 50%;
            margin-top: -30px;
            margin-left: -30px;
            border: solid 2px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: rgb(0, 0, 0, .5);
            font-size: 30px;
            padding: 7px 0 0 17px;
          }
        `}</style>
      </div>
    )
  } else {
    isMedia = false
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
          {(article.get('title') || isMedia) ? (
            <div className="card-header d-md-flex align-items-top mb-3">
              <div className="item-replyRequestCount mr-3 pt-1">
                {article.get('replyRequestCount')} คนสงสัย
              </div>
              <div className="item-title">{article.get('title')}</div>
            </div>
          ) : (
            ``
          )}

          <div className="card-body d-md-flex justify-content-md-between pt-0">
            <div className="card-body-left  d-flex flex-column justify-content-between">
              {(article.get('title') || isMedia) ? (
                <div className="item-text">{renderText}</div>
              ) : (
                <div className="card-notitle d-md-flex align-items-top">
                  <div className="item-replyRequestCount mr-3 pt-1">
                    {article.get('replyRequestCount')} คนสงสัย
                  </div>
                  <div className="item-text">{renderText}</div>
                </div>
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
              <div className="d-sm-flex mt-3">
                {articleCreator != null ? (
                  <div className="item-createBy mr-2 float-left">
                    {articleCreator}
                  </div>
                ) : (
                  <div className="item-createBy mr-2 float-left">
                    ไม่ระบุชื่อ
                  </div>
                )}
                <ArticleInfo article={article} />
                {isLogin && (
                  <ArticleItemWidget
                    id={id}
                    read={read}
                    notArticleReplied={notArticleReplied}
                    onChange={handleLocalEditorHelperList}
                  />
                )}
                <FlaggedReplyInfomation replyConnections={replyConnections} />
              </div>
            </div>

            <div className="card-body-right">
              <div className="d-flex flex-column align-items-center h-100 justify-content-start mt-4">
                <ArticleTruthMeter avgRadian={meterDegree} size={`small`} />

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
