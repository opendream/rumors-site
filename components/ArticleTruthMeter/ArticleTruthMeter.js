import React from 'react';

export default function ArticleTruthMeter({ avgRadian, size }) {
  let tag = '';
  tag = convertDegreeToTag(avgRadian);

  return (
    <div className={`meter ${size}`}>
      {tag != 0 ? (
        <div className="meter-tag">
          <div className={tag}>meter: {tag}</div>
        </div>
      ) : null}

      <style jsx>{`
        /* Small item */
        .meter.small {
          margin: 0;
        }
        .meter.small .meter-tag > div {
          background: url(/static/img/meter/bg-meter@2x.png) no-repeat center
            center;
          background-size: 100%;
          width: 85px;
          height: 55px;
          text-indent: -999em;
          margin-bottom: 0.5rem;
          position: relative;
        }
        .meter.small .meter-tag > div:before {
          content: '';
          display: inline-block;
          width: 0;
          position: absolute;
          height: 0;
          border-style: solid;
          border-width: 0 7px 30px 7px;
          border-color: transparent transparent #252525 transparent;
          bottom: -10%;
          left: 20%;
          transform: rotate(-90deg);
          z-index: auto;
        }

        .meter.small .meter-tag > div:after {
          transform: translate(-50%, 0);
          content: '';
          background: url(/static/img/meter/btn-false@2x.png) no-repeat bottom
            left;
          background-size: 100%;
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 35px;
          height: 25px;
        }
        .meter.small .meter-tag > div.false:after {
          background: url(/static/img/meter/btn-false@2x.png) no-repeat center
            center;
          background-size: 100%;
        }
        .meter.small .meter-tag > div.true:after {
          background: url(/static/img/meter/btn-true@2x.png) no-repeat center
            center;
          background-size: 100%;
        }
        .meter.small .meter-tag > div.middle:after {
          background: url(/static/img/meter/btn-middle@2x.png) no-repeat center
            center;
          background-size: 100%;
        }
        .meter.small .meter-tag > div.mostly-true--start:after,
        .meter.small .meter-tag > div.mostly-true--middle:after,
        .meter.small .meter-tag > div.mostly-true--last:after {
          background: url(/static/img/meter/btn-mostly_true@2x.png) no-repeat
            center center;
          background-size: 100%;
        }
        .meter.small .meter-tag > div.mostly-false--start:after,
        .meter.small .meter-tag > div.mostly-false--middle:after,
        .meter.small .meter-tag > div.mostly-false--last:after {
          background: url(/static/img/meter/btn-mostly_false@2x.png) no-repeat
            center center;
          background-size: 100%;
        }

        .meter.small .meter-tag > div.false:before {
          bottom: -10%;
          left: 20%;
          transform: rotate(-90deg);
        }
        .meter.small .meter-tag > div.true:before {
          bottom: -10%;
          left: auto;
          right: 20%;
          transform: rotate(90deg);
        }
        .meter.small .meter-tag > div.middle:before {
          bottom: 12%;
          left: 43%;
          transform: rotate(0deg);
        }
        .meter.small .meter-tag > div.mostly-true--start:before,
        .meter.small .meter-tag > div.mostly-true--middle:before,
        .meter.small .meter-tag > div.mostly-true--last:before {
          bottom: 10%;
          left: auto;
          right: 28%;
          transform: rotate(40deg);
        }
        .meter.small .meter-tag > div.mostly-true--middle:before {
          bottom: 12%;
          left: auto;
          right: 33%;
          transform: rotate(25deg);
        }
        .meter.small .meter-tag > div.mostly-true--start:before {
          bottom: 12%;
          left: auto;
          right: 40%;
          transform: rotate(12deg);
        }

        .meter.small .meter-tag > div.mostly-false--start:before,
        .meter.small .meter-tag > div.mostly-false--middle:before,
        .meter.small .meter-tag > div.mostly-false--last:before {
          bottom: 10%;
          left: 28%;
          transform: rotate(-35deg);
        }

        .meter.small .meter-tag > div.mostly-false--last:before {
          bottom: 12%;
          left: 40%;
          transform: rotate(-5deg);
        }
        .meter.small .meter-tag > div.mostly-false--middle:before {
          bottom: 12%;
          left: 33%;
          transform: rotate(-20deg);
        }

        /* Large Item */

        .meter {
          margin-bottom: 1rem;
        }
        .meter-tag > div {
          background: url(/static/img/meter/bg-meter@2x.png) no-repeat center
            center;
          background-size: 100%;
          width: 145px;
          height: 80px;
          text-indent: -999em;
          margin-bottom: 1rem;
          position: relative;
        }
        .meter-tag > div:before {
          content: '';
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
          transform: translate(-50%, 0);
          content: '';
          background: url(/static/img/meter/btn-false@2x.png) no-repeat bottom
            left;
          background-size: 100%;
          position: absolute;
          bottom: -10px;
          left: 50%;
          width: 65px;
          height: 40px;
        }
        .meter-tag > div.false:after {
          background: url(/static/img/meter/btn-false@2x.png) no-repeat center
            center;
          background-size: 100%;
        }
        .meter-tag > div.true:after {
          background: url(/static/img/meter/btn-true@2x.png) no-repeat center
            center;
          background-size: 100%;
        }
        .meter-tag > div.middle:after {
          background: url(/static/img/meter/btn-middle@2x.png) no-repeat center
            center;
          background-size: 100%;
        }
        .meter-tag > div.mostly-true--start:after,
        .meter-tag > div.mostly-true--middle:after,
        .meter-tag > div.mostly-true--last:after {
          background: url(/static/img/meter/btn-mostly_true@2x.png) no-repeat
            center center;
          background-size: 100%;
        }
        .meter-tag > div.mostly-false--start:after,
        .meter-tag > div.mostly-false--middle:after,
        .meter-tag > div.mostly-false--last:after {
          background: url(/static/img/meter/btn-mostly_false@2x.png) no-repeat
            center center;
          background-size: 100%;
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
          left: 43%;
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

function convertDegreeToTag(avgRadians) {
  let tag = '';
  if (avgRadians >= 180) tag = 'true';
  else if (avgRadians <= 0) tag = 'false';
  else if (avgRadians == 90) tag = 'middle';
  else if (avgRadians > 90 && avgRadians < 120) tag = 'mostly-true--start';
  else if (avgRadians >= 120 && avgRadians < 150) tag = 'mostly-true--middle';
  else if (avgRadians >= 150 && avgRadians < 180) tag = 'mostly-true--last';
  else if (avgRadians <= 90 && avgRadians > 60) tag = 'mostly-false--last';
  else if (avgRadians <= 60 && avgRadians > 30) tag = 'mostly-false--middle';
  else if (avgRadians <= 30 && avgRadians > 0) tag = 'mostly-false--start';
  else tag = '';
  return tag;
}
