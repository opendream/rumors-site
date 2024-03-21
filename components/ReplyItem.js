import React from 'react';
import { Link } from '../routes';
import moment from 'moment';
import { listItemStyle } from './ListItem.styles';
import { TYPE_ICON, TYPE_NAME } from '../constants/replyType';
import i18n from 'i18n';

export default function ReplyItem({ reply, showUser = true }) {
  const replyType = reply.get('type');
  const createdAt = moment(reply.get('createdAt'));

  let renderText = reply.get('text')
  let isMedia = true

  if (renderText.startsWith('$image__')) {
    const fileId = renderText.split('__')[2]
    renderText = (<div>
      <iframe height={300} src={`https://drive.google.com/file/d/${fileId}/preview`}></iframe>
    </div>)
    // renderText = <img className={`image-content mb-2`} src={`https://drive.google.com/thumbnail?&sz=1000&export=download&id=${fileId}`} style={{maxHeight: 300, maxWidth: '100%'}} />
  } else if (renderText.startsWith('$video')) {
    const fileId = renderText.split('__')[2]
    renderText = (
      <div className={`position-relative d-inline-block`}>
        <iframe height={300} src={`https://drive.google.com/file/d/${fileId}/preview`}></iframe>
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
    isMedia = false;
  }

  return (
    <Link route='reply' params={{ id: reply.get('id') }}>
      <a className="item">
      <div className="item-content">
        <div title={TYPE_NAME[replyType]} className="float-left mr-3"><strong>{TYPE_NAME[replyType]}</strong></div>
        <div className="item-createBy">
          {showUser ? `${reply.getIn(['user', 'name'], i18n.t("someone"))}` : ''}
        </div>

        <div className="item-text">
          <div className="bubble">
            {isMedia ? (
              <div className="item-text">{renderText}</div>
            ) : (
              <div className="d-md-flex align-items-top">
                <div className="item-text">{renderText}</div>
              </div>
            )}
          </div>
          <div className="item-info">
            {i18n.t("usedIn")} {reply.get('replyConnectionCount')} {i18n.t("article")}
            {createdAt.isValid() ? (
              <span title={createdAt.format('lll')}>
                ・{createdAt.fromNow()}
              </span>
            ) : (
              ''
            )}
          </div>
          </div>
        </div>
        <style jsx>{listItemStyle}</style>
        <style jsx>{`
          .item {
            display: flex;
          }
          .item-createBy {
            display: inline
          }
          .item-content {
            // margin-left: 8px;
            min-width: 0; /* Make inner ellipsis work */
          }
          .item-content .item-text {
            white-space: pre-wrap;

          }
          .item-info {
            font-size: 0.8em;
            color: rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </a>
    </Link>
  );
}
