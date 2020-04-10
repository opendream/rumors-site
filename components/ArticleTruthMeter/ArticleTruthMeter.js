import React from 'react';

export default function ArticleTruthMeter({ replyConnections }) {
  let totalWeight = 0;
  let maxPossibleWeight = 0;
  let minPossibleWeight = 0;
  let normalizedTotalWeight = 0;
  let gaugeDegree = 0;
  let tag = '';

  const notRumorWeight = 1;
  const rumorWeight = -1;


  let notRumorCount = 0;
  let rumorCount = 0;


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
    else if (normalizedTotalWeight === 0) tag = 'middle';
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
      <div className="meter">

        {tag != 0 ? (
          <div className="meter-tag">
            <div className={tag}>meter: {tag}</div>
          </div>
        ) : null}

        <style jsx>{`
          .meter {
            margin-bottom: 1rem;
          }
          .meter-tag > div {
            background: url(/static/img/meter/bg-meter@2x.png) no-repeat center center;
            background-size: 100%;
            width: 145px;
            height: 80px;
            text-indent: -999em;
            margin-bottom: 1rem;
            position: relative;

          }
          .meter-tag > div:before {
            content: "";
            display: inline-block;
            width: 0;
            position: absolute;
            height: 0;
            border-style: solid;
            border-width: 0 10px 50px 10px;
            border-color: transparent transparent #252525 transparent;
            bottom: -20%;
            left: 20%;
            transform: rotate(-90deg);
            z-index: auto;
          }

          .meter-tag > div:after {
            transform: translate(-50%,0);
            content: "";
            background: url(/static/img/meter/btn-false@2x.png) no-repeat bottom left;
            background-size: cover;
            position: absolute;
            bottom: -10px;
            left: 50%;
            width: 65px;
            height: 40px;
          }
          .meter-tag > div.false:after {
            background: url(/static/img/meter/btn-false@2x.png) no-repeat center center;
            background-size: cover;
          }
          .meter-tag > div.true:after {
            background: url(/static/img/meter/btn-true@2x.png) no-repeat center center;
            background-size: cover;
          }
          .meter-tag > div.middle:after {
            background: url(/static/img/meter/btn-middle@2x.png) no-repeat center center;
            background-size: cover;
          }
          .meter-tag > div.mostly-true--start:after,
          .meter-tag > div.mostly-true--middle:after,
          .meter-tag > div.mostly-true--last:after {
            background: url(/static/img/meter/btn-mostly_true@2x.png) no-repeat center center;
            background-size: cover;
          }
          .meter-tag > div.mostly-false--start:after,
          .meter-tag > div.mostly-false--middle:after,
          .meter-tag > div.mostly-false--last:after {
            background: url(/static/img/meter/btn-mostly_false@2x.png) no-repeat center center;
            background-size: cover;
          }

          .meter-tag > div.false:before {
            bottom: -20%;
            left: 20%;
            transform: rotate(-90deg);
          }
          .meter-tag > div.true:before {
            bottom: -20%;
            left: auto;
            right: 20%;
            transform: rotate(90deg);
          }
          .meter-tag > div.middle:before {
            bottom: 10%;
            left:44%;
            transform: rotate(0deg);
          }
          .meter-tag > div.mostly-true--start:before,
          .meter-tag > div.mostly-true--middle:before,
          .meter-tag > div.mostly-true--last:before {
            bottom: 0;
            left: auto;
            right: 30%;
            transform: rotate(40deg);
          }
          .meter-tag > div.mostly-true--middle:before {
            bottom: 10%;
            left: auto;
            right: 35%;
            transform: rotate(25deg);
          }
          .meter-tag > div.mostly-true--start:before {
            bottom: 12%;
            left: auto;
            right: 42%;
            transform: rotate(12deg);
          }


          .meter-tag > div.mostly-false--start:before,
          .meter-tag > div.mostly-false--middle:before,
          .meter-tag > div.mostly-false--last:before {
            bottom: 0%;
            left: 30%;
            transform: rotate(-35deg);
          }

          .meter-tag > div.mostly-false--last:before {
            bottom: 10%;
            left: 40%;
            transform: rotate(-5deg);
          }
          .meter-tag > div.mostly-false--middle:before {
            bottom: 10%;
            left: 35%;
            transform: rotate(-20deg);
          }
          

          


          
        `}</style>
        </div>

 
    
  );
}
