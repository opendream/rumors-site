import React from 'react';
import Head from 'next/head';
import AutoCompleteSearchBox from '../components/AutoCompleteSearchBox';
import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';

import i18n from '../i18n';
import Router from 'next/router';

class AboutPage extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  render() {
    return (
      <div className={``}>
        <AppLayout>
          <div className="root wrapper-page">
            <Head>
              <title>
                {/*TODO:: ChangeKey to About Page*/}
                {i18n.t('pageCreate.title')} | Cofacts {i18n.t('realOrFake')}
              </title>
            </Head>

          </div>
          <div className="section section-line">
            <div className="container">
              <div className="content">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8">
                    <h2 className="text-center mb-5">เกี่ยวกับเรา</h2>
                    
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
                  <a href="https://www.thaihealth.or.th/" target="_blank">
                    <img
                      src="/static/img/partner/logo-thaihealth@2x.png"
                      alt="สสส."
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.hdcentre.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-hd@2x.png"
                      alt="HD Centre"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://thailand.fnst.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-f@2x.png"
                      alt="มูลนิธิฟรีดริช เนามัน"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="http://www.thaimediafund.or.th/" target="_blank">
                    <img
                      src="/static/img/partner/logo-tmf@2x.png"
                      alt="THAI MEDIA FUND"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://changefusion.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-cf@2x.png"
                      alt="CHANGEFUSION"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.opendream.co.th/" target="_blank">
                    <img
                      src="/static/img/partner/logo-od@2x.png"
                      alt="OPENDREAM"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://wisesight.com/" target="_blank">
                    <img
                      src="/static/img/partner/logo-wisesight@2x.png"
                      alt="WISESIGHT"
                      className="img-fluid"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://www.consumerthai.org/" target="_blank">
                    <img
                      src="/static/img/partner/logo-ffc@2x.png"
                      alt="มูลนิธิเพื่อผู้บริโภค"
                      className="img-fluid"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <style> {sectionStyle} </style>

          <style jsx>
            {`
              
              /* Section LINE */

              .section-line {
                background: #f0b4d0 url('static/img/bg-gp-cofact.png') no-repeat
                  left center;
                background-size: 90%;
                margin: 1rem 0 0;
              }

              @media screen and (min-width: 768px) {
                .section-line {
                  background-size: 40%;
                  padding-bottom: 5rem;
                }
              }

              .content {
                padding: 3rem 0;
              }

              .content p {
                font-size: 1.25rem;
                font-weight: 300;
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

            `}
          </style>
        </AppLayout>
      </div>
    );
  }
}

export default AboutPage;
