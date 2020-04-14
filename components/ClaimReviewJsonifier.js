import React from 'react';

export default function ClaimReviewJsonifier({ article, avgRadian }) {
  console.log(article);
  let id = article.get('id');
  let title = article.get('text');
  let link = article.get('references');
  let rating = 0;

  rating = convertDegreeToRating(avgRadian);

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
      appearance: {link},
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
