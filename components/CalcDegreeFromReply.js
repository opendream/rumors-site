import React from 'react';

export default function CalcDegreeFromReply( replyConnections ) {
  console.log('CONNN#1 : ' + replyConnections);
  let avgRadians;
  let totalReplyTypes = [0, 0, 0];
  totalReplyTypes = populateTotalReplyTypes(replyConnections);
  avgRadians = calcDegreeFromReply(totalReplyTypes);
  return avgRadians;
}

function populateTotalReplyTypes(replyConnections) {
  let totalReplyTypes = [0, 0, 0];

  const notRumorWeight = 1;
  const rumorNotRumorWeight = 1;
  const rumorWeight = 1;

  console.log('CONNN : ' + replyConnections);

  if (typeof replyConnections != 'undefined') {
    let userWeight = 0;
    replyConnections.map(connections => {
      const replyType = connections.get('reply').get('type');
      const userType = connections.get('user').get('belongTo');
      // console.log('TYPE : ' + replyType);

      switch (replyType) {
        case 'NOT_RUMOR':
          // notRumorCount++;

          userWeight = calcUserWeight(userType);
          totalReplyTypes[2] = totalReplyTypes[2] + userWeight * notRumorWeight;
          break;
        case 'RUMOR_NOT_RUMOR':
          // rumorNotRumorCount++;
          userWeight = calcUserWeight(userType);
          totalReplyTypes[1] =
            totalReplyTypes[1] + userWeight * rumorNotRumorWeight;
          break;
        case 'RUMOR':
          // rumorCount++;
          userWeight = calcUserWeight(userType);
          totalReplyTypes[0] = totalReplyTypes[0] + userWeight * rumorWeight;
          break;
      }
    });

    return totalReplyTypes;
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

function calcUserWeight(userType) {
  let userWeight;
  if (userType == null) userWeight = 1;
  else userWeight = 10;
  return userWeight;
}
