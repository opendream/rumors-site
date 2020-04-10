import React from 'react';

export default function ArticleTruthMeter({ replyConnections }) {
  let totalWeight = 0;
  let maxPossibleWeight = 0;
  let minPossibleWeight = 0;
  let normalizedTotalWeight = 0;
  let gaugeDegree = 0;
  let tag = '';

  const notRumorWeight = 1;
  const rumorNotRumorWeight = 0.5;
  const rumorWeight = 0;

  let notRumorCount = 0;
  let rumorCount = 0;
  let rumorNotRumorCount = 0;

  let totalReplyTypes = [];

  if (typeof replyConnections != 'undefined') {
    let userWeight = 0;
    replyConnections.map(connections => {
      const replyType = connections.get('reply').get('type');
      const userType = connections.get('user').get('belongTo');
      console.log('TYPE : ' + replyType);

      userWeight = calcUserWeight(userType);
      switch (replyType) {
        case 'NOT_RUMOR':
          notRumorCount++;
          totalReplyTypes.push(userWeight * notRumorWeight);
          break;
        case 'RUMOR_NOT_RUMOR':
          rumorNotRumorCount++;
          totalReplyTypes.push(userWeight * rumorNotRumorWeight);

          break;
        case 'RUMOR':
          rumorCount++;
          totalReplyTypes.push(userWeight * rumorWeight);
          break;
      }

      tag = convertNormalizeWeightToTags(normalizedTotalWeight);
    });

    var avgRadians = calcDegreeFromReply(totalReplyTypes);
    console.log(totalReplyTypes + ' : AVG Radian : ' + avgRadians);
  }

  function calcDegreeFromReply(totalReplyTypes) {
    let typeRadian = 180 / (totalReplyTypes.length - 1);
    let totalRadians = totalReplyTypes
      .map((total, i) => i * typeRadian * total)
      .reduce((a, b) => a + b, 0);
    let totalReplies = totalReplyTypes.reduce((a, b) => a + b, 0);
    let avgRadians = totalRadians / totalReplies;
    return avgRadians;
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
    </div>
  );
}
