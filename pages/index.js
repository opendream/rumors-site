import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';


import i18n from '../i18n';

class IndexPage extends React.Component {
  state = {
    isSubmitting: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <AppLayout>

        <div className="root wrapper">
          <Head>
            <title>
              {i18n.t('pageCreate.title')} | Cofacts {i18n.t('realOrFake')}
            </title>
          </Head>

          {/*Section#1*/}
          <div className="jumbotron text-light">
            <div className="text-center">
              <h1 className="mb-2 h2">
                Cofacts - พื้นที่เปิดเพื่อการตรวจสอบข่าวลวงร่วมกัน
              </h1>
              <h2 className="mb-2 h4">
                คนใกล้ชิดของคุณอาจจะส่งต่อ<em className="emphasis">
                  ข่าวลวงบนอินเทอร์เน็ต
                </em>โดยไม่รู้ตัว?
              </h2>
              <p>
                ติดตาม LINE Bot
                หรือเข้าร่วมทีมบรรณาธิการเพื่อช่วยกันปกป้องคนที่คุณห่วงใยจากข่าวลวงออนไลน์!
              </p>
              <div className="align-items-center">
                <div id="SearchQueryField">
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="query" />
                    <button type="submit" disabled={isSubmitting}>
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <style>{jumbotronStyle}</style>
        </div>

        {/*Section#2*/}
        <div className="section bg-warning section-line">
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
        
        <style jsx>{`
            
          
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
