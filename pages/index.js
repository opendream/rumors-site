import React from 'react';
import Head from 'next/head';
import AutoCompleteSearchBox from '../components/AutoCompleteSearchBox';
import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';

import i18n from '../i18n';
import Router from 'next/router';

class IndexPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  render() {
    return (
      <body className={`home`}>
        <AppLayout>
          <div className="root wrapper-page">
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
                  คนใกล้ชิดของคุณ อาจ<em className="emphasis">
                    ตกเป็นเหยื่อของข่าวลวง
                  </em>{' '}
                  หรือ <br className={`d-none d-md-block`} />
                  <em className="emphasis">
                    ส่งต่อข่าวลวง
                  </em>บนอินเทอร์เน็ตโดยไม่รู้ตัว
                </h2>
                <div className="row justify-content-md-center">
                  <div className={`col col-lg-8 col-xl-6`}>
                    <div id="SearchQueryField">
                      {/*<form onSubmit={this.handleSubmit}>*/}
                      {/*  <input type="text" name="query" />*/}
                      {/*  <button type="submit">Search</button>*/}
                      {/*</form>*/}
                      <AutoCompleteSearchBox
                        items={['t', 'this', 'no', 'co', 'Cov']}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Section#2*/}
          <div className="section section-line">
            <div className="container">
              <div className="content">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="add-line d-flex align-items-end mb-3 mb-lg-4">
                      <h2 className="mr-2 mr-lg-3 mb-0">เช็คข่าวลวง<br />ชวน Add LINE</h2>
                      <img src="/static/img/btn-line-cofact.png" alt="@cofact" className="btn-line img-fluid" />
                    </div>
                    <div className="add-line-detail">
                      <p>หากคุณสงสัยว่าข้อความที่พบเป็น<strong>ข่าวลวง ข่าวลือ</strong> หรือ<br className="d-none d-md-block" />
                      <strong>ข้อความหลอก</strong> ส่งข้อความนั้นมาให้ Chatbot ของเราช่วยตรวจสอบได้เลย </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="add-line-qr d-none d-lg-block">
                <div className="d-flex align-items-start pl-5">
                  <div className="d-flex flex-column align-items-center p-4">
                    <h3>โดยเข้าไป<br />Add LINE</h3>
                    <img src="/static/img/btn-line-cofact.png" alt="@cofact" width="150px" className="btn-line img-fluid" />
                  </div>
                  <p className="align-self-center txt1-5 px-4">หรือ</p>
                  <div className="d-flex flex-column align-items-center p-4">
                    <h3>สแกน QR Code</h3>
                    <img src="/static/img/qr-code.png" alt="QR" width="150px" className="img-fluid" />
                  </div>
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
              <h4 className="d-none d-lg-block">คุณก็สามารถเริ่มตรวจสอบข้อความหรือข่าวนั้นได้ทันที</h4>
              <div className="phone-container d-block d-lg-none">
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
            
                
                
                
                
                
              
              
            </div>
            <style> {sectionStyle} </style>
       

          <style jsx>
            {`

              .txt1-5 { font-size: 1.5rem; }
              .jumbotron {
                background-color: transparent;
                color: #fff;
                text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
                border-radius: 0;
                margin-bottom: 0;
              }
              .jumbotron h1 {
                font-size: 2rem;
              }
              .jumbotron h2 {
                font-size: 1.5rem;
              }
              @media screen and (min-width: 768px) {
                .jumbotron {
                  padding: 6rem 2rem;
                }
                .jumbotron h1 {
                  font-size: 2.5rem
                }
                .jumbotron h2 {
                  font-size: 2rem;
                }
              }
              .jumbotron .emphasis {
                color: #ff79ac;
                font-weight: 500;
                font-style: normal;
              }
              .jumbotron h2 {
                font-weight: 400;
              }
              
              video { 
                max-width: 100%; 
                
              }


              .section-line {
                background: #f0b4d0 url("static/img/bg-gp-cofact.png") no-repeat left center ;
                background-size: 50%;
                min-height: 100vh;
                
              }
              .section-line .content {
                padding: 2rem 0.5rem;
              }
                .add-line h2 {
                  font-weight: 600;
                  font-size: 1.75rem;
                }
                .add-line img {
                  width: 100px;
                }
                .add-line-detail p {
                  font-size: 1.25rem
                }

                .add-line-qr {
                  background: url("static/img/bg-white-check@2x.png") no-repeat right top;
                  background-size: 100%;
                  margin-bottom: 1rem;
                  position: relative;
                }
                
                .add-line-qr .phone-container {
                  right: 11rem;
                  position: absolute;
                  top: -18rem;
                }
                .phone-container { position: relative; }
                .phone-container .phone-img:before {
                  content: "";
                  width: 350px;
                  height: 750px;
                  background: url("static/img/bg-frame-iphone.png") no-repeat left top;
                  background-size: 100%;
                  position: absolute;
                  left: -15px;
                }

                .phone-container .phone-img video {
                  // width: 96%;
                  // width: auto;
                  // margin-left: -10px;
                  width: 320px;
                }

              @media screen and (min-width: 768px) {
                .section-line .content {
                  padding: 2rem;
                }
                .add-line h2 {
                  font-size: 2rem;
                }
                .add-line-detail p {
                  font-size: 1.5rem
                }
                .add-line img {
                  width: 200px;
                }
              }

              @media screen and (min-width: 1024px) {
                .section-line .content {
                  padding: 4rem 0;
                }
                .add-line h2 {
                  font-size: 2.5rem;
                }
                .add-line-detail p {
                  font-size: 1.5rem
                }
                .add-line img {
                  width: 250px;
                }
              }

            `}
          </style>
        </AppLayout>
      </body>
    );
  }
}

export default IndexPage;
