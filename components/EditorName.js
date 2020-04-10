import React from 'react';
import levelNames from '../constants/levelNames';
import 'balloon-css/balloon.css';

export default function EditorName({ editorName, editorLevel, editorBelongTo }) {
  return (
    <span className="item-createBy">
      <span 
        data-balloon={`Lv.${editorLevel} ${levelNames[editorLevel]} `}
        data-balloon-pos="up"
      >
        {editorBelongTo?
        <span><img src={`${require('./AppLayout/images/verified-account.png')}`} width={30} height={30}/>{editorBelongTo}</span>
        : 
        editorName
        }

      </span>
      <style jsx>{`
        .item-createBy {
          font-weight: 400;
        }
        .item-createBy::before {
          content: "";
          padding-right: 25px;
          background: url(/static/img/icon/ic-profile@2x.png) no-repeat left center;
          background-size: 20px;
        }
        
      `}</style>
    </span>
  );
}
