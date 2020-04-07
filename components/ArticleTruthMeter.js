import React from 'react';
import moment from 'moment';
import i18n from '../i18n';

export default function ArticleTruthMeter({
  truthFactor,
  isOutOfCofactScope,
  hasPersonalOpinion,
}) {

    console.log(truthFactor + " : "+ isOutOfCofactScope+ " : "+ hasPersonalOpinion);
  return (
    <div className="root">
      <p> {truthFactor}</p>
      <h1>{isOutOfCofactScope}</h1>
      <h2>{hasPersonalOpinion}</h2>
    </div>
  );
}
