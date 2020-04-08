import React from 'react';
import OutOfScopeImage from './img/ic-no-scope.png';
import HasOpinionImage from './img/ic-comment.png';

export default function ArticleTruthMeter({ replyConnections }) {
  let maxPossibleWeight = 0;
  let minPossibleWeight = 0;
  let normalizedTotalWeight = 0;
  let totalWeight = 0;
  let notRumorWeight = 1;
  let rumorWeight = -1;
  let isOutOfScope = false;
  let hasOpinion = false;

  if (typeof replyConnections != 'undefined') {
    let userWeight = 0;
    replyConnections.map(connections => {
      const replyType = connections.get('reply').get('type');
      const userType = connections.get('user').get('belongTo');

      switch (replyType) {
        case 'NOT_RUMOR':
          userWeight = calcUserWeight(userType);
          updateMinMax(userWeight);
          totalWeight += notRumorWeight * userWeight;
          normalizedTotalWeight = calcNormalizeWeight(
            totalWeight,
            maxPossibleWeight,
            minPossibleWeight
          );
          break;
        case 'RUMOR':
          userWeight = calcUserWeight(userType);
          updateMinMax(userWeight);
          totalWeight += rumorWeight * userWeight;
          normalizedTotalWeight = calcNormalizeWeight(
            totalWeight,
            maxPossibleWeight,
            minPossibleWeight
          );
          break;
        case 'NOT_ARTICLE':
          isOutOfScope = true;
          break;
        case 'OPINIONATED':
          hasOpinion = true;
          break;
      }

      console.log(
        'TOTAL WEIGHT : ' + totalWeight + ' : ' + normalizedTotalWeight
      );
    });
  }

  function updateMinMax(userWeight) {
    maxPossibleWeight += userWeight;
    minPossibleWeight = -maxPossibleWeight;
  }

  function calcNormalizeWeight(
    totalWeight,
    maxPossibleWeight,
    minPossibleWeight
  ) {
    let normalizedWeight = 0;
    normalizedWeight =
      2 *
        ((totalWeight - minPossibleWeight) /
          (maxPossibleWeight - minPossibleWeight)) -
      1;
    return normalizedWeight;
  }

  function calcUserWeight(userType) {
    let userWeight;
    if (userType == null) userWeight = 1;
    else userWeight = 10;
    return userWeight;
  }

  return (
    <div className="">
      <p>Normalized Weight (-1, 1) : {normalizedTotalWeight}</p>
      {isOutOfScope ? <img src={OutOfScopeImage} /> : null}
      {hasOpinion ? <img src={HasOpinionImage} /> : null}
    </div>
  );
}
