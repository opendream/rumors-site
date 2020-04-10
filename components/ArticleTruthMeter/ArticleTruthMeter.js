import React from 'react';

export default function ArticleTruthMeter({ replyConnections }) {
  let normalizedTotalWeight = 0;
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
      // console.log('TYPE : ' + replyType);

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
    });

    if (totalReplyTypes.length > 0) {
      var avgRadians = calcDegreeFromReply(totalReplyTypes);
      console.log(totalReplyTypes + ' : AVG Radian : ' + avgRadians);
      tag = convertDegreeToTag(avgRadians);
    }
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

  function convertDegreeToTag(avgRadians) {
    let tag = '';
    if (avgRadians >= 180) tag = 'true';
    else if (avgRadians <= 0) tag = 'false';
    else if (avgRadians > 90 && avgRadians < 120)
      tag = 'mostly-true--start';
    else if (avgRadians > 120 && avgRadians < 150)
      tag = 'mostly-true--middle';
    else if (avgRadians > 150 && avgRadians < 180)
      tag = 'mostly-true--last';
    else if (avgRadians < 90 && avgRadians > 60)
      tag = 'mostly-false--start';
    else if (avgRadians < 60 && avgRadians > 30)
      tag = 'mostly-false--middle';
    else if (avgRadians < 30 && avgRadians > 0)
      tag = 'mostly-false--last';
    else tag = '';
    return tag;
  }

  function calcUserWeight(userType) {
    let userWeight;
    if (userType == null) userWeight = 1;
    else userWeight = 10;
    return userWeight;
  }

  return (
    <div>
      {totalReplyTypes.length > 0 ? (
        <div className={tag}>
          <p>Normalized Weight tag : {tag}</p>
          <p>Degree : {avgRadians}</p>
        </div>
      ) : null}
    </div>
  );
}
