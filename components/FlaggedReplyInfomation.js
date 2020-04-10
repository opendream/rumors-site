import React from 'react';

export default function FlaggedReplyInfomation({ replyConnections }) {
  let outOfScopeReplyAmount = 0;
  let opinionReplyAmount = 0;
  if (replyConnections != null) {
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
        <div>
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
        </div>
      ) : null}
    </div>
  );
}
