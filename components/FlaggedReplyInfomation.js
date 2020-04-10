import React from 'react';

export default function FlaggedReplyInfomation({ replyConnections }) {
  let outOfScopeReplyAmount = 0;
  let opinionReplyAmount = 0;
  if (replyConnections !== undefined) {
    replyConnections.map(reply => {
      if (reply.get('reply').get('type') === 'NOT_ARTICLE')
        outOfScopeReplyAmount++;
      else if (reply.get('reply').get('type') === 'OPINIONATED')
        opinionReplyAmount++;
    });
  }

  return (
    <div>
      {replyConnections && replyConnections.size > 0 ? (
        <div className="d-lg-flex">
          {outOfScopeReplyAmount > 0 ? (
            <div className="item-outOfScopeReplyAmount mb-2">
              {outOfScopeReplyAmount} คนว่า ไม่อยู่ในขอบเขตการตรวจสอบ
            </div>
          ) : null}

          {opinionReplyAmount > 0 ? (
            <div className="item-opinionReplyAmount mb-2">
              {opinionReplyAmount} คนว่า มีความเห็นส่วนตัว
            </div>
          ) : null}
        </div>
      ) : null}
      <style jsx>
        {`
        .item-opinionReplyAmount,
        .item-outOfScopeReplyAmount {
          font-size: 90%; 
        }
        @media screen and (min-width: 576px) {
          .item-opinionReplyAmount,
          .item-outOfScopeReplyAmount {
            border-left: 1px solid #9E9E9E;
            padding-left: 5px;
            margin-left: 5px;
          }
        }
      
        .item-outOfScopeReplyAmount::before {
          content: "";
          padding-right: 25px;
          background: url(/static/img/icon/ic-warning@2x.png) no-repeat left center;
          background-size: 20px;
        }
        .item-opinionReplyAmount::before {
          content: "";
          padding-right: 25px;
          background: url(/static/img/icon/ic-comments@2x.png) no-repeat left center;
          background-size: 20px;
        }
        `}
      </style>
    </div>
  );
}
