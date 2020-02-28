import React from 'react';
import levelNames from '../constants/levelNames';
import 'balloon-css/balloon.css';

export default function EditorName({ editorName, editorLevel, editorBelongTo }) {
  return (
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
  );
}
