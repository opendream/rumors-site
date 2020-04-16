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
      <div className={`home`}>
        <AppLayout>
          <div className="root wrapper-page">
            <Head>
              <title>
                {/* {i18n.t('pageCreate.title')} | Cofacts {i18n.t('realOrFake')}  */}
                Cofact - พื้นที่เปิดให้ทุกคนมาช่วยกันตรวจสอบข่าวลวง
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
                      {/*<form onSubmit={this.handleSubmit} className="row no-gutters justify-content-center">*/}
                      {/*  <div className="pr-2 col-9 col-md-10">*/}
                      {/*    <input className="form-control text-field" type="text" name="query" placeholder="พิมพ์ข้อความที่ต้องการตรวจสอบ" />*/}
                      {/*  </div>*/}
                      {/*  <div className="col-3 col-md-2">*/}
                      {/*    <button type="submit" className="btn btn-primary w-100">ค้นหา</button>*/}
                      {/*  </div>*/}
                      {/*</form>*/}
                      <AutoCompleteSearchBox />
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
                  <div className="col-12 col-lg-8 col-xl-6">
                    <div className="add-line d-flex align-items-end mb-3 mb-lg-4">
                      <h2 className="mr-2 mr-lg-3 mb-0">เช็คข่าวลวง<br />ชวน Add LINE</h2>
                      <a href="https://line.me/R/ti/p/%40Cofact" target="_blank"><img src="/static/img/btn-line-cofact.png" alt="@cofact" className="btn-line img-fluid" /></a>
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
                    <h4>โดยเข้าไป<br />Add LINE</h4>
                    <a href="https://line.me/R/ti/p/%40Cofact" target="_blank"><img src="/static/img/btn-line-cofact.png" alt="@cofact" width="150px" className="btn-line img-fluid" /></a>
                  </div>
                  <p className="align-self-center txt1-5 px-4">หรือ</p>
                  <div className="d-flex flex-column align-items-center p-4">
                    <h4>สแกน QR Code</h4>
                    <img src="/static/img/qr-code.png" alt="QR" width="120px" className="img-qr img-fluid" />
                  </div>
                </div>
                <div className="phone-container">
                  <div className="phone-img">
                    <video
                      poster="/static/img/recording-line.gif"
                      src="/static/img/recording-line.mp4"
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                </div>
                <h4 className="d-none d-lg-block">คุณก็สามารถเริ่มตรวจสอบข้อความหรือข่าวนั้นได้ทันที</h4>
              </div>
              
              <div className="phone-container d-block d-lg-none">
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                      <div className="phone-img">
                        <video
                          poster="/static/img/recording-line.gif"
                          src="/static/img/recording-line.mp4"
                          autoPlay
                          loop
                          muted
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-8">
                      <p className="add-line-sm"><span className="mr-2">โดยเข้าไป Add LINE</span> <a href="https://line.me/R/ti/p/%40Cofact" target="_blank"><img src="/static/img/btn-line-cofact.png" alt="@cofact" width="120px" className="btn-line img-fluid" /></a></p>
                    </div>
                  </div>
                </div>
                  
                  
                </div>
            </div>


            <div className="container mt-5 mt-lg-0">
              <div className="row justify-content-center align-items-lg-center">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 order-lg-2">
                  <h2 className="f-xl lh1 px-3">ร่วมแบ่งปันความเห็น<br />ชวน Post และ Comment</h2>
                  <p className="f-md px-3">ข่าวลวงบนเว็บไซต์ Cofact</p>
                  <div className="text-center text-lg-left px-lg-3 my-5 d-none d-lg-block">
                    <a href="/articles" className="btn-white btn-lg btn">ค้นหาข่าวลวง</a>
                  </div>
                </div>
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                  <div className="text-black card card-white d-flex flex-row mx-2 mx-lg-4 mt-4 mt-lg-0">
                    <div className="ic-post mr-3 mt-2">
                      <img src="/static/img/ic-post.png" alt="" width="90px"  className="img-fluid" />
                    </div>
                    <div className="">
                      <div className="lh1 mb-3">
                        <span className="f-xl">Post</span><br /><span className="f-lg">ข้อความที่อยากตรวจสอบ</span>
                      </div>
                      <p>เพื่อให้ทุกคนได้เข้ามาแบ่งปันความคิดเห็นและให้ข้อมูลเกี่ยวกับข่าวลวงนั้น</p>
                    </div>
                  </div>
                  <div className="text-white card card-pink d-flex flex-row">
                    <div className="ic-comment mr-3 mt-2">
                      <img src="/static/img/ic-comment.png" alt="" width="90px" className="img-fluid" />
                    </div>
                    <div className="">
                      <div className="lh1 mb-3">
                        <span className="f-xl">Comment</span><br /><span className="f-lg">ว่าข้อความนั้นจริงหรือไม่</span>
                      </div>
                      <p>หากมีแหล่งอ้างอิงที่น่าเชื่อถือ เพื่อเป็นข้อมูลให้นำไปตัดสินใจว่าควรเชื่อหรือไม่</p>
                    </div>
                  </div>
                  <div className="text-center my-5 d-block d-lg-none">
                    <a href="/articles" className="btn-white btn-lg btn">ค้นหาข่าวลวง</a>
                  </div>
                </div>
              </div>
            </div>
            
          
          </div>
          {/*Section#3*/}
          <div className="section section-partner py-3 py-lg-4 bg-white">
            <h2 className="text-center my-4">Partners</h2>
            <div className="container">
              <ul className="partner-list">
                <li>
                  <a href="https://www.thaihealth.or.th/" target="_blank"><img src="/static/img/partner/logo-thaihealth@2x.png" alt="สสส." className="img-fluid" /></a>
                </li>
                <li>
                  <a href="https://www.hdcentre.org/" target="_blank"><img src="/static/img/partner/logo-hd@2x.png" alt="HD Centre" className="img-fluid" /></a>
                </li>
                <li>
                  <a href="https://thailand.fnst.org/" target="_blank"><img src="/static/img/partner/logo-f@2x.png" alt="มูลนิธิฟรีดริช เนามัน" className="img-fluid" /></a>
                </li>
                <li>
                  <a href="http://www.thaimediafund.or.th/" target="_blank"><img src="/static/img/partner/logo-tmf@2x.png" alt="THAI MEDIA FUND" className="img-fluid" /></a>
                </li>
                <li>
                  <a href="https://changefusion.org/" target="_blank"><img src="/static/img/partner/logo-cf@2x.png" alt="CHANGEFUSION" className="img-fluid" /></a>
                </li>
                <li>
                  <a href="https://www.opendream.co.th/" target="_blank"><img src="/static/img/partner/logo-od@2x.png" alt="OPENDREAM" className="img-fluid" /></a>
                </li>
                <li>
                  <a href="https://wisesight.com/" target="_blank"><img src="/static/img/partner/logo-wisesight@2x.png" alt="WISESIGHT" className="img-fluid" /></a>
                </li>
                <li>
                  <a href="https://www.consumerthai.org/" target="_blank"><img src="/static/img/partner/logo-ffc@2x.png" alt="มูลนิธิเพื่อผู้บริโภค" className="img-fluid" /></a>
                </li>
              </ul>
            </div>
          </div>


          <style> {sectionStyle} </style>
       

          <style jsx>
            {`

              .txt1-5 { font-size: 1.5rem; }
              .lh1 { line-height: 1.1;}

              .f-xl { font-size: 1.75rem; font-weight: 600; }
              .f-lg { font-size: 1.4rem; font-weight: 500; }
              .f-md { font-size: 1.35rem; line-height: 1.5em; }

              @media screen and (min-width: 768px) {
                .f-xl { font-size: 2.25rem; font-weight: 600; }
                .f-lg { font-size: 1.75rem; font-weight: 500; }
                .f-md { font-size: 1.35rem }
              }

              @media screen and (min-width: 992px) {
                .f-xl { font-size: 2.25rem; font-weight: 600; }
                .f-lg { font-size: 1.75rem; font-weight: 500; }
                .f-md { font-size: 1.5rem }
              }

              video { max-width: 100%; }
              
              
              .btn-white {
                background: #fff;
                color: #FF79AC;
                font-weight: 600;
                padding: 1rem 2rem;
                font-size: 1.35rem;
              }
              .btn-white:hover {
                background: #FF79AC;
                color: #fff;
              }


              .card {
                border: 0;
                padding: 1rem;
                margin-right: 2rem !important
              }
              .card p { 
                font-size: 1.15rem; 
              } 

              @media screen and (min-width: 1200px) {
                .card { padding: 1.5rem; }
                .card p {
                  font-size: 1.4rem;
                }
              }

              .card-pink {
                background: rgba(236,126,177,0.75);
                margin-top: -1rem;
                margin-left: 2rem;
                margin-right: 0 !important
              }
              @media screen and (min-width: 768px) {
                .card-pink {
                  background: rgba(236,126,177,0.75);
                  margin-top: -1rem;
                  margin-left: 4rem;
                }
              }
              .card-pink:after {
                content: " ";
                position: absolute;
                right: 20px;
                bottom: -15px;
                border-top: 15px solid rgba(236,126,177,0.75);
                border-right: 0px solid transparent;
                border-left: 20px solid transparent;
                border-bottom: none;
              }

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
              
            
              /* Section LINE */

              .section-line {
                background: #f0b4d0 url("/static/img/bg-gp-cofact.png") no-repeat left center ;
                background-size: 90%;
                min-height: 100vh;
              }

              @media screen and (min-width: 768px) {
                .section-line {
                  background-size: 40%;
                  padding-bottom: 5rem;
                }
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
                @media screen and (min-width: 340px) {
                  .add-line img {
                    width: 120px;
                  }
                }
                .add-line-detail p {
                  font-size: 1.25rem
                }

                .add-line-qr {
                  background: url("/static/img/bg-white-check@2x.png") no-repeat right top;
                  background-size: 100%;
                  margin-bottom: 1rem;
                  position: relative;
                }
                
                @media screen and (min-width: 992px) {
                  .add-line-qr {
                    margin-bottom: 8rem;
                  }
                }

                @media screen and (min-width: 1200px) {
                  .add-line-qr {
                    margin-bottom: 15rem;
                  }
                }
                
                .add-line-qr .phone-container {
                  right: 11rem;
                  position: absolute;
                  top: -18rem;
                }

                .phone-container { position: relative; }
                .phone-container .phone-img {
                  text-align: center;
                }
                .phone-container .phone-img:before {
                  content: "";
                  width: 85%;
                  height: 130%;
                  // background: url("/static/img/bg-frame-iphone.png") no-repeat top center;
                  background: url("/static/img/frame-mobile-i7@2x.png") no-repeat top center;
                  background-size: 100%;
                  position: absolute;
                  left: 8%;
                }
                .phone-container .phone-img video {
                  width: 83%;
                  margin-top: 25%;
                }

                .add-line-sm {
                  background: url("/static/img/bg-white-sm.png") no-repeat top right;
                  background-size: 100%;
                  padding: 0 0 0 2rem;
                  margin-right: -30px;
                  margin-top: 0;
                  min-height: 65px;
                  overflow: hidden;
                  display: flex;
                  align-items: center;
                }
                .add-line-sm {
                  font-weight: 600;
                }
                @media screen and (min-width: 330px) {
                  .phone-container .phone-img video {
                    width: 82%;
                    margin-top: 24%;
                  }
                }
              @media screen and (min-width: 375px) {
                .add-line-sm {
                  height: 70px;
                  padding: 0 0 0 3rem;
                }
                .add-line-sm span {
                  font-size: 1.2rem;
                }
              }

              @media screen and (min-width: 768px) {
                .add-line-sm {
                  height: 85px;
                  padding: 0 0 0 3rem;
                }
                .add-line-sm span {
                  font-size: 1.45rem;
                }
                .section-line .content {
                  padding: 2rem;
                }
                .add-line h2 {
                  font-size: 2.25rem;
                }
                .add-line-detail p {
                  font-size: 1.65rem
                }
                .add-line img {
                  width: 200px;
                }
                .phone-container .phone-img video {
                  width: 80%;
                  margin-top: 24%;
                }
              }

              @media screen and (min-width: 992px) {
                .add-line h2 {
                  font-size: 2rem;
                }
                .add-line-detail p {
                  font-size: 1.35rem
                }
                .add-line img {
                  width: 180px;
                }
                .add-line-qr .phone-container {
                  right: 0;
                  position: absolute;
                  top: -20rem;
                }
                .phone-container .phone-img video {
                  width: 75%;
                  margin-top: 22%;
                }
              }

              @media screen and (min-width: 1024px) {
                .section-line .content {
                  padding: 4rem 0;
                }
                .add-line-qr {
                  height: 220px;
                }
                
                .add-line h2 {
                  font-size: 2.5rem;
                }
                .add-line-detail p {
                  font-size: 1.65rem
                }
                .add-line img {
                  width: 250px;
                }
                
              }
              @media screen and (min-width: 1200px) {
                .add-line img {
                  width: 250px;
                }
                .add-line-qr .img-qr { width: 150px !important;}
                .add-line-qr .phone-container {
                  right: 12rem;
                  position: absolute;
                  top: -20rem;
                }
                .phone-container .phone-img:before {
                  width: 100%;
                  left: 0;
                }
                .phone-container .phone-img video {
                  width: 88%;
                  margin-top: 26%;
                }
              }

              /* Parner List */
              .partner-list {
                list-style: none;
                margin: 0;
                padding: 0;
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: center;
              }
              .partner-list li {
                flex: 0 0 50%;
              }
              @media screen and (min-width: 768px) {
                .partner-list li {
                  flex: 0 0 240px;
                }
              }

              /* Static Search */

              #SearchQueryField .form-inline .form-control,
              #SearchQueryField .text-field {
                padding: 15px;
                font-size: 16px;
                height: auto;
                font-weight: 300;
                border-radius: 10px
              }
              @media screen and (min-width: 768px) {
                #SearchQueryField .text-field {
                  font-size: 20px;
                }
              }
              #SearchQueryField .form-inline .form-control {
                width: 79%;
                margin-right: 1%;
              }
              #SearchQueryField .btn { padding: 15px; }
              #SearchQueryField .form-inline .btn {
                width: 20%;
                padding: 15px;
              }
              #SearchQueryField .btn-primary {
                background-color: #f0b4d0;
                border-color: #f0b4d0;
                font-size: 16px;
                color: #000;
                border-radius: 10px;
              }
              @media screen and (min-width: 768px) {
                #SearchQueryField .btn-primary {
                  font-size: 20px;
                }
              }
              #SearchQueryField .btn-primary:hover,
              #SearchQueryField .btn-primary:active,
              #SearchQueryField .btn-primary:focus {
                background-color: #ff79ac !important;
                border-color: #ff79ac !important;
                color: #000;
              }

            `}
          </style>
        </AppLayout>
      </div>
    );
  }
}

export default IndexPage;
