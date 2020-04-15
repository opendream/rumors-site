import React from 'react';
import reply from '../pages/reply';
import i18n from '../i18n';
import { List } from 'immutable';

export default function ClaimReviewJsonifier({
  article,
  avgRadian,
  replyConnections,
}) {
  let id = article.get('id');
  let url = 'https://cofact.org/article/' + id;
  let titleText = article.get('text');
  let link = determineReferenceLink(article);

  let rating = convertDegreeToRating(avgRadian);
  let altRatingName = determineAltRatingNameFromRating(rating);
  let author = determineAuthor(replyConnections);

  function determineReferenceLink(article) {
    let urlLink = '';
    let hyperlinks = article.get('hyperlinks');
    let linkCount = 0;

    if (hyperlinks.size > 0) {
      hyperlinks.map(link => {
        linkCount++;
        if (linkCount === 1) {
          urlLink = link.get('url');
        }
      });
    }

    return urlLink;
  }

  function determineAltRatingNameFromRating(rating) {
    switch (rating) {
      case 1:
        return i18n.t('altNameIsFake');
      case 2:
        return i18n.t('altNameIsMostlyFake');
      case 3:
        return i18n.t('altNameIsSomewhatTrue');
      case 4:
        return i18n.t('altNameIsMostlyTrue');
      case 5:
        return i18n.t('altNameIsTrue');
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

  function determineAuthor(replyConnections) {
    let author = {};

    let authorCount = 0;
    let firstReplyName = '';
    let userWithBelongToFlag = null;
    let userIdArray = [];

    replyConnections.map(reply => {
      let user = reply.get('user');
      let userId = user.get('id');
      let userBelongTo = user.get('belongTo');

      if (!userIdArray.includes(userId)) {
        authorCount++;
        userIdArray.push(userId);
      }

      if (userBelongTo != null) userWithBelongToFlag = user;

      if (authorCount === 1) firstReplyName = user.get('name');
    });

    if (authorCount > 1) {
      firstReplyName =
        firstReplyName +
        ' ' +
        i18n.t('with') +
        ' ' +
        (authorCount - 1) +' '+
        i18n.t('otherUserRespond');
    }

    if (userWithBelongToFlag != null) {
      let url =
        'https://www.google.com/search?q=' + userWithBelongToFlag.get('name');
      author = {
        '@type': 'Organization',
        name: userWithBelongToFlag.get('name'),
        url: url,
      };
    } else {
      author = {
        '@type': 'Person',
        name: firstReplyName,
      };
    }

    return author;
  }

  let claimReviewJson = {
    '@context': 'https://schema.org',
    '@type': 'ClaimReview',
    claimReviewed: titleText,
    url: url,
    author: author,
    itemReviewed: {
      '@type': 'Claim',
      appearance: { link },
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: '5',
      worstRating: '1',
      alternateName: altRatingName,
    },
  };

  return <script>{JSON.stringify(claimReviewJson)}</script>;
}
