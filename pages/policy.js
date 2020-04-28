import React from 'react';
import Head from 'next/head';
import AutoCompleteSearchBox from '../components/AutoCompleteSearchBox';
import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';

import i18n from '../i18n';

class PolicyPage extends React.Component {
  render() {
    return (
      <div className={`policy`}>
        <AppLayout>
          <div className="root wrapper-page">
            <Head>
              <title>
                นโยบายการใช้งาน
              </title>
            </Head>
          </div>
          {/*Section#2*/}
          <div className="section section-line">
            <div className="container">
              <div className="content">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8">
                    <h2 className="text-center mb-md-5 mb-3">นโยบายการใช้งาน</h2>
                    <p>Cofact เป็นพื้นที่ที่เปิดให้ทุกคนเข้ามามีส่วนร่วมในการตรวจสอบข่าวและแสวงหาความจริง ดังนั้น ความคิดเห็นต่อข่าวหรือข้อความจึงมีหลากหลาย ไม่จำเป็นต้องเหมือนกัน เช่นในข่าวเรื่องหนึ่ง อาจมีผู้ใช้ส่วนหนึ่งแสดงความเห็นว่าเป็น <strong>“เรื่องจริง”</strong> ในขณะที่ผู้อีกส่วนแสดงความเห็นว่าเป็น <strong>“เรื่องไม่จริง”</strong> ดังนั้น สิ่งที่สำคัญกว่าการแปะป้ายว่าเป็นเรื่องจริงหรือไม่จริง ก็คือการที่ทุกคนที่แสดงความเห็นต่างมีหน้าที่ที่จะแสดงเหตุผลและแหล่งข้อมูลมาสนับสนุนความคิดเห็นของตนเอง เมื่อข้อมูลที่แตกต่างหลากหลายถูกนำเสนอประกอบกัน ผู้อ่านจะสามารถตัดสินใจได้เองว่าควรจะเชื่อหรือไม่เชื่อส่วนใดของข่าวนั้นๆ ด้วยตนเอง</p>
                    <p>อย่างไรก็ตาม Cofact ไม่ได้ปล่อยให้ในพื้นที่มีแต่ความคิดเห็นอิสระจากผู้ใช้ แต่มีทีมบรรณาธิการที่เป็นอาสาสมัครที่มีความรู้ ประสบการณ์ และความคุ้นเคยในวงการข่าวด้านต่างๆ มาร่วมกันเป็นทีมที่นำหัวข้อข่าวเข้าระบบ และช่วยให้ความเห็นต่อข่าวที่นำเข้า ด้วยความเชี่ยวชาญและจรรยาบรรณวิชาชีพ ทั้งนี้ เพื่อดูแลบรรยากาศในการแสดงความเห็นและดูแลทิศทางการแสดงความเห็น ไม่ให้ถูกชี้นำหรือชักพาโดยผู้ใช้ที่อาจมีเจตนาแอบแฝง เช่นกลุ่มผลประโยชน์ที่มีส่วนได้ส่วนเสียกับเนื้อหาของข่าวนั้นๆ เป็นต้น</p>

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

export default PolicyPage;
