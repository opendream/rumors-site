import React from 'react';
import reply from '../pages/reply';

export default function ClaimReviewJsonifier({
  article,
  avgRadian,
  replyConnections,
}) {
  let id = article.get('id');
  let url = 'https://cofact.org/article/' + id;
  let titleText = article.get('text');
  let link = article.get('references');
  let rating = 0;

  rating = convertDegreeToRating(avgRadian);

  let author = determineAuthor(replyConnections);

  let claimReviewJson = {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    claimReviewed: titleText,
    url: url,
    author: author,
    datePublished: '2019-11-23',
    itemReviewed: {
      '@type': 'Claim',
      appearance: { link },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: '5',
      worstRating: '1',
      alternateName: 'เป็นเรื่องหลอกลวง',
    },
  };

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

  function determineAuthor(replyConnections) {
    let author = {
      '@type': 'Person',
      name: 'k',
    };

    replyConnections.map(reply => {
      console.log("replyID : "+reply.get('user'));
    });

    return author;
  }

  return <script>{JSON.stringify(claimReviewJson)}</script>;
}
