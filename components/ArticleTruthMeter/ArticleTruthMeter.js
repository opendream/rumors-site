import React from 'react';
import OutOfScopeImage from './img/ic-no-scope.png';
import HasOpinionImage from './img/ic-comment.png';

export default function ArticleTruthMeter({ articleId, replyConnections }) {
  let totalWeight = 0;
  let notRumorWeight = 1;
  let rumorWeight = -1;
  let isOutOfScope = false;
  let hasOpinion = false;


  if (typeof replyConnections != 'undefined') {

    let multiplier = 0;
    replyConnections.map(connections => {
      const replyType = connections.get('reply').get('type');
      const userType = connections.get('user').get('belongTo');
      console.log(replyType + ' : ' + userType);

      if (userType == null) {
        multiplier = 1;
      } else {
        multiplier = 10;
      }

      switch (replyType) {
        case 'NOT_RUMOR':
          totalWeight += notRumorWeight * multiplier;
          break;
        case 'RUMOR':
          totalWeight -= rumorWeight * multiplier;
          break;
        case 'NOT_ARTICLE':
          isOutOfScope = true;
          break;
        case 'OPINIONATED':
          hasOpinion = true;
          break;
      }


      console.log("TOTAL WEIGHT : "+totalWeight);

    });
  }

  return (
    <div className="">
      <p> SCORE : {totalWeight}</p>
      {/*{isOutOfCofactScope ? <img src={OutOfScopeImage} /> : null}*/}
      {/*{hasPersonalOpinion ? <img src={HasOpinionImage} /> : null}*/}
    </div>
  );
}
