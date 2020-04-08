import React from 'react';
import OutOfScopeImage from './img/ic-no-scope.png';
import HasOpinionImage from './img/ic-comment.png';

export default function ArticleTruthMeter({ replyConnections }) {
  let totalWeight = 0;
  let maxPossibleWeight = 0;
  let minPossibleWeight = 0;
  let normalizedTotalWeight = 0;
  let gaugeDegree = 0;
  let tag = '';

  const notRumorWeight = 1;
  const rumorWeight = -1;

  let isOutOfScope = false;
  let hasOpinion = false;

  let notRumorCount = 0;
  let rumorCount = 0;
  let hasOpinionCount = 0;
  let outOfScopeCount = 0;


  if (typeof replyConnections != 'undefined') {
    let userWeight = 0;
    replyConnections.map(connections => {
      const replyType = connections.get('reply').get('type');
      const userType = connections.get('user').get('belongTo');

      switch (replyType) {
        case 'NOT_RUMOR':
          notRumorCount++;
          userWeight = calcUserWeight(userType);
          updateMinMax(userWeight);
          totalWeight += notRumorWeight * userWeight;
          normalizedTotalWeight = calcNormalizeWeight(
            totalWeight,
            maxPossibleWeight,
            minPossibleWeight
          );
          gaugeDegree = calcDegreeFromNormalizedWeight(normalizedTotalWeight);
          break;
        case 'RUMOR':
          rumorCount++;
          userWeight = calcUserWeight(userType);
          updateMinMax(userWeight);
          totalWeight += rumorWeight * userWeight;
          normalizedTotalWeight = calcNormalizeWeight(
            totalWeight,
            maxPossibleWeight,
            minPossibleWeight
          );
          gaugeDegree = calcDegreeFromNormalizedWeight(normalizedTotalWeight);
          break;
        case 'NOT_ARTICLE':
          outOfScopeCount++;
          isOutOfScope = true;
          break;
        case 'OPINIONATED':
          hasOpinion++;
          hasOpinion = true;
          break;
      }

      tag = convertNormalizeWeightToTags(normalizedTotalWeight);
      console.log(
        'TOTAL WEIGHT : ' +
          totalWeight +
          ' : ' +
          normalizedTotalWeight +
          ' : ' +
          tag +
          ' : ' +
          gaugeDegree +
          'deg'
      );
    });
  }

  function calcDegreeFromNormalizedWeight(normalizedTotalWeight) {
    return normalizedTotalWeight * 90 + 90;
  }

  function convertNormalizeWeightToTags(normalizedTotalWeight) {
    let tag = '';
    if (normalizedTotalWeight === 1) tag = 'true';
    else if (normalizedTotalWeight === -1) tag = 'false';
    else if (normalizedTotalWeight > 0.01 && normalizedTotalWeight < 0.33)
      tag = 'mostly-true--start';
    else if (normalizedTotalWeight > 0.33 && normalizedTotalWeight < 0.66)
      tag = 'mostly-true--middle';
    else if (normalizedTotalWeight > 0.66 && normalizedTotalWeight < 0.99)
      tag = 'mostly-true--last';
    else if (normalizedTotalWeight < -0.01 && normalizedTotalWeight > -0.33)
      tag = 'mostly-false--start';
    else if (normalizedTotalWeight < -0.33 && normalizedTotalWeight > -0.66)
      tag = 'mostly-false--middle';
    else if (normalizedTotalWeight < -0.66 && normalizedTotalWeight > -0.99)
      tag = 'mostly-false--last';
    else tag = '';
    return tag;
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
    <div className={tag}>
      <p>Normalized Weight tag : {tag}</p>
      {isOutOfScope ? <img src={OutOfScopeImage} /> : null}
      {hasOpinion ? <img src={HasOpinionImage} /> : null}
    </div>
  );
}