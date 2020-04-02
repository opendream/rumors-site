import React from 'react';
import Head from 'next/head';
import AutoCompleteSearchBox from '../components/AutoCompleteSearchBox';
import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';

import i18n from '../i18n';

class IndexPage extends React.Component {
  
  render() {

    return (
      <AppLayout>
        <div className="root">
          <Head>
            <title>
              {i18n.t('pageCreate.title')} | Cofacts {i18n.t('realOrFake')}
            </title>
          </Head>

          {/*Section#1*/}
          <div className="jumbotron text-light">
            <div className="text-center">
              <h1 className="mb-3">
                Cofact - พื้นที่เปิดให้ทุกคนมาช่วยกันตรวจสอบข่าวลวง
              </h1>
              <h2 className="mt-3 mb-5">
                  คนใกล้ชิดของคุณ อาจ<em className="emphasis">ตกเป็นเหยื่อของข่าวลวง</em> หรือ <br className={`d-none d-md-block`} />
                  <em className="emphasis">ส่งต่อข่าวลวง</em>บนอินเทอร์เน็ตโดยไม่รู้ตัว
              </h2>
              <div className="row justify-content-md-center">
                <div className={`col col-md-8 col-lg-6`}>
                  <div id="SearchQueryField">
                    <AutoCompleteSearchBox />
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          <style>{jumbotronStyle}</style>
        </div>

        {/*Section#2*/}
        <div className="section section-line">
          <div className="inner">
            <div className="content">
              <p>
                Add LINE @cofact หรือ QR Code แล้ว "ส่งต่อ"
                ข้อความที่คุณคิดว่าเป็น ข่าวลวง ข่าวลือ ข้อความหลอก หรือ
                ข้อความน่าสงสัย เพื่อให้ Chat Bot
                ของเราช่วยตรวจสอบความน่าเชื่อถือของข้อความเหล่านั้น!
              </p>
              <p>
                <img src="/static/img/qr-code.png" />
              </p>
            </div>
            <div className="phone-container">
              <div className="phone-img">
                <video
                  poster="/static/img/recording-still-th.gif"
                  src="/static/img/recording-th.mp4"
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
          </div>
          <style> {sectionStyle} </style>
        </div>

        <style jsx>
          {`
            .jumbotron {
              background-color: transparent;
              color: #fff;
              text-shadow: 0 2px 6px rgba(0,0,0,0.6);
              border-radius: 0;
            }
            .jumbotron .emphasis {
              color: #FF79AC; 
              font-weight: 500;
              font-style: normal;
            }
            .jumbotron h2 {
              font-weight: 400;
            }
            .section-line {
              background-color: #F0B4D0;
            }
          `}
        </style>

        <style jsx global>{`
          body {
            font-family: 'Kanit', sans-serif;
          }
        `}</style>
      </AppLayout>
    );
  }
}

export default IndexPage;
