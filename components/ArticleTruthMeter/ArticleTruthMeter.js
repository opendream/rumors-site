import React from 'react';
import OutOfScopeImage from './img/ic-no-scope.png';
import HasOpinionImage from './img/ic-comment.png';

export default function ArticleTruthMeter({
  truthFactor,
  isOutOfCofactScope,
  hasPersonalOpinion,
}) {
  console.log(
    truthFactor + ' : ' + isOutOfCofactScope + ' : ' + hasPersonalOpinion
  );
  return (
    <div className="">
      <p> {truthFactor}</p>
      {isOutOfCofactScope ? <img src={OutOfScopeImage} /> : null}
      {hasPersonalOpinion ? <img src={HasOpinionImage} /> : null}
    </div>
  );
}
