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
                เกี่ยวกับเรา
              </title>
            </Head>

          </div>
          <div className="section section-line">
            <div className="container">
              <div className="content">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8">
                    <h2 className="text-center mb-md-5 mb-3">Cofact  - Join us as a fact checker! <br />ชวนทุกคนมาตรวจสอบข้อมูลข่าวสารร่วมกันกับเรา </h2>
                    <p><strong>โครงการโคแฟค หรือ Collaborative Fact Checking</strong>  เกิดขึ้นมาด้วยแรงบันดาลใจจากการรวมตัวของภาคประชาสังคมในไต้หวันที่เชื่อในเรื่อพลังของภาคพลเมืองในการรับมือกับด้านมืดของข้อมูลข่าวสาร ด้วยการมีพื้นที่กลางในการให้ทุกฝ่ายมาช่วยกันค้นหาข้อเท็จจริง เพื่อไม่ให้ฝ่ายใดฝ่ายหนึ่งเป็นเพียงผู้รู้จริง เพราะบางครั้งข้อเท็จจริงอาจเปลี่ยนแปลงไปได้ตามกาลเวลาและเหตุปัจจัย   ดังนั้นภาคประชาสังคมในประเทศไทยเราก็ต้องการสร้างพื้นที่กลางที่เปิดกว้าง ปลอดภัย และ สร้างสรรค์ในการที่จะค้นหาความจริงร่วมกัน  ในยุคที่ข้อมูลข่าวสารเต็มไปด้วยความเข้าใจผิด สับสนอลหม่าน  จนบางครั้งยากที่จะเชื่อใครหรืออะไรได้ </p>
                    <p>เมื่อกลางปี พ.ศ.2562  ภาคประชาสังคมในประเทศไทยได้จัดงานสัมมนาว่าด้วยเรื่องการแก้ปัญหาข่าวลวง หรือ  International Conference on Fake News นำโดยภาคี ๘ องค์กร อาทิ สำนักงานกองทุนพัฒนาสื่อปลอดภัยและสร้างสรรค์  สำนักงานสนับสนุนการสร้างเสริมสุขภาพ (สสส.) Friedrich Naumann Foundation for Freedom (FNF) องค์การกระจายเสียงและแพร่ภาพสาธารณะแห่งประเทศไทย สภาการหนังสือพิมพ์แห่งชาติ  สมาคมผู้ผลิตข่าวออนไลน์   คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย  คณะวารสารศาสตร์และสื่อสารมวลชน มหาวิทยาลัยธรรมศาสตร์  โดยการสัมมนาในครั้งนั้นได้ลงนามประกาศปฏิญญารวมพลังขับเคลื่อนต่อต้านข่าวลวงข่าวปลอมร่วมกันด้วย อีกทั้งได้รับเกียรติจากรัฐมนตรีดิจิทัลของไต้หวันคือคุณออเดรย์ ถัง มาเป็นวิทยากรคนสำคัญที่ได้แลกเปลี่ยนประสบการณ์งานของโคแฟคต้นแบบในไต้หวัน จากนั้นมาก็ได้มีการประสานงานเพื่อสร้างความร่วมมือ จนนำมาสู่โครงการโคแฟคในประเทศไทย  </p>
                    <p>แนวคิดของโคแฟค เป็นการผสานการผลักดันการใช้เทคโนโลยีของภาคพลเมือง (Civic Tech)   กับงานเชิงข่าวด้านวารสารศาสตร์  (Journalism)  โดยมีกองบรรณาธิการร่วมกับอาสาสมัครในการกรองข่าว และ เปิดพื้นที่ให้ทุกคนมาร่วมแลกเปลี่ยนโต้แย้งข้อเท็จจริงและความเห็นได้  อีกทั้งมี Chatbot หรือโปรแกรมการพูดคุยอัตโนมัติที่เปิดให้ทุกคนมาส่งข่าวให้ทีมกลั่นกรองได้  จากนั้นก็จะมีทีมเผยแพร่ในสื่อสังคมออนไลน์ และ สื่อมวลชนด้วย รวมทั้งพัฒนางานข่าวเชิงลึก เช่นมีข้อความที่น่าสนใจอันสืบเนื่องจากประเด็นข่าวจริงข่าวลวงที่เป็นกระแสหรือที่มีความสนใจในเชิงนโยบายและประโยชน์สาธารณะในโครงการ Cofact Journalism    </p>
                    <p>เบื้องต้นเราได้รับการสนับสนุนจากองค์กรที่ให้ความสำคัญกับเรื่องนี้ คือ สำนักงานสนับสนุนการสร้างเสริมสุขภาพ (สสส.) Center for Humanitarian Dialogue (HD) Friedrich Naumann Foundation for Freedom (FNF)  ซึ่งดำเนินการโดยทีม ChangeFusion และ Opendream มีภาคีผู้สนับสนุนเนื้อหาอย่าง  มูลนิธิเพื่อผู้บริโภค Wisesight รวมทั้งภาคีภาครัฐอย่างสำนักงานกองทุนพัฒนาสื่อปลอดภัยและสร้างสรรค์ หรือพันธมิตรอย่างชัวร์ก่อนแชร์ รวมทั้งภาคีภาคประชาสังคมในท้องถิ่น มหาวิทยาลัย และ องค์กรวิชาชีพสื่อ เป็นต้น     </p>
                    <p>เราเชื่อว่าการแก้ปัญหาข่าวลวงในยุคดิจิทัลคือการทำให้ทุกคนกลายเป็นคนตรวจสอบข่าวหรือ Fact checker และ สร้างพื้นที่ในการแสวงหาข้อเท็จจริงร่วมกัน โดยเปิดเวทีให้มีตลาดทางความคิดเห็นที่หลากหลาย (Marketplace of Ideas) แยกแยะได้ระหว่างข้อเท็จจริง (Facts) และความคิดเห็น (Opinion) โดยเชื่อมั่นในวิจารณญาณของสังคม ท้ายที่สุดแล้วถ้าเราไม่สามารถเชื่ออะไรได้เลย ก็ไม่เชื่อไว้ก่อนจนกว่าจะมีการสืบค้นข้อเท็จจริงจนประจักษ์ร่วมกัน ย่อมดีกว่าการเชื่อไปโดยไม่ไตร่ตรอง หรือ เชื่ออย่างมืดบอด ดังคำพูดของคุณออเดรย์ ถังที่กล่าวไว้ในเวทีการประชุมที่กรุงเทพว่า <strong>“Blind trust is worse than no trust!”</strong>   การเชื่ออะไรอย่างมืดบอดนั้นน่ากลัวกว่าการที่เราไม่เชื่อไว้ก่อน  ดังนั้นมาร่วมกันค้นหาตรวจสอบความจริงยุคข้อมูลข่าวสารร่วมกับเรากันเถอะ เริ่มต้นจากเรื่องสุขภาพใกล้ตัวก่อน โดยเฉพาะในสถานการณ์โรคระบาดโควิด19 ที่คุกคามพลเมืองทั่วโลก  ไวรัสที่มาพร้อมกับการระบาดของข้อมูลข่าวสาร (Infodemic) เราได้รวบรวมบความไว้จำนวนหนึ่งแล้ว รอทุกท่านมาเป็นชุมชนคนโคแฟคร่วมกัน เพื่อสร้างสุขภาวะร่วมกันของสังคม  </p>

                    <h4>เครดิต</h4>
                    <p>
                      หากคุณต้องการสร้าง Cofact ในแบบของคุณเอง คุณสามารถดาวน์โหลด source code ต้นฉบับของไต้หวันได้
                      <a href="https://github.com/cofacts" target="_blank">ที่นี่</a>
                      &nbsp;หรือจะต่อยอดจากเวอร์ชั่น TaiThai ได้
                      <a href="https://github.com/search?q=topic%3Acofacts+fork%3Atrue+org%3Aopendream&type=Repositories" target="_blank">ที่นี่</a>
                    </p>

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
