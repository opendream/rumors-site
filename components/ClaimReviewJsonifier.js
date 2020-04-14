import React from 'react';

export default function ClaimReviewJsonifier({ article, replyConnections }) {
  console.log(article);
  let id = article.get('id');
  let title = article.get('text');
  let link = article.get('references');
  let rating = 0;

  let notRumorCount = 0;
  let rumorNotRumorCount = 0;
  let rumorCount = 0;

  let totalReplyTypes = [0, 0, 0];

  totalReplyTypes = populateTotalReplyTypes(replyConnections);

  if (totalReplyTypes.length > 0) {
    let avgRadians = calcDegreeFromReply(totalReplyTypes);
    rating = convertDegreeToRating(avgRadians);
    // console.log(
    //   totalReplyTypes + ' : AVG Radian : ' + avgRadians + 'T: ' + tag
    // );
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

  function populateTotalReplyTypes(replyConnections) {
    let totalReplyTypes = [0, 0, 0];

    const notRumorWeight = 1;
    const rumorNotRumorWeight = 1;
    const rumorWeight = 1;

    if (typeof replyConnections != 'undefined') {
      let userWeight = 0;
      replyConnections.map(connections => {
        const replyType = connections.get('reply').get('type');
        const userType = connections.get('user').get('belongTo');
        console.log('TYPE : ' + replyType);

        switch (replyType) {
          case 'NOT_RUMOR':
            notRumorCount++;

            userWeight = calcUserWeight(userType);
            totalReplyTypes[2] =
              totalReplyTypes[2] + userWeight * notRumorWeight;
            break;
          case 'RUMOR_NOT_RUMOR':
            rumorNotRumorCount++;
            userWeight = calcUserWeight(userType);
            totalReplyTypes[1] =
              totalReplyTypes[1] + userWeight * rumorNotRumorWeight;
            break;
          case 'RUMOR':
            rumorCount++;
            userWeight = calcUserWeight(userType);
            totalReplyTypes[0] = totalReplyTypes[0] + userWeight * rumorWeight;
            break;
        }
      });

      return totalReplyTypes;
    }
  }

  function convertDegreeToRating(avgRadians) {
    let rating = 0;
    if (avgRadians >= 180) rating = 5;
    else if (avgRadians <= 0) rating = 1;
    else if (avgRadians === 90) rating = 3;
    else if (avgRadians > 90 && avgRadians < 180) rating = 4;
    else if (avgRadians < 90 && avgRadians > 0) rating = 2;
    else rating = 0;
    return rating;
  }

  function calcUserWeight(userType) {
    let userWeight;
    if (userType == null) userWeight = 1;
    else userWeight = 10;
    return userWeight;
  }

  let claimReviewJson = {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    claimReviewed: title,
    url: 'https://cofact.org/article/1li9139uion6w/2',
    author: {
      '@type': 'Person',
      name: 'k',
    },
    datePublished: '2019-11-23',
    itemReviewed: {
      '@type': 'Claim',
      appearance: 'https://board.postjung.com/1166664',
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: '5',
      worstRating: '1',
      alternateName: 'เป็นเรื่องหลอกลวง',
    },
  };

  return (
    <script>{JSON.stringify(claimReviewJson)}</script>

    //   <p>
    //     Claimed !! {id} : {title} : {link} : {rating}
    //   </p>
    //   <script type="application/ld+json">

    // </script>
  );
}
