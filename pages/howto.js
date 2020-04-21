import React from 'react';
import Head from 'next/head';
import AppLayout from 'components/AppLayout';

import i18n from '../i18n';

class HowtoPage extends React.Component {
  render() {
    return (
      <div className={`howto`}>
        <AppLayout>
          <div className="root wrapper-page">
            <Head>
              <title>
                แนะนำการใช้งาน cofact.org
              </title>
            </Head>
          </div>

          {/*Section Content*/}
          <div className="section section-content">
            <div className="container">
              <div className="content">
                <div className="row justify-content-center">
                  <div className="col-12 col-md-10 col-lg-9">
                  <div className="pb-2">
                    <h2 className="text-center mb-md-5 mb-3">แนะนำการใช้งาน cofact.org</h2>
                    <p>หากพบข้อความที่น่าสงสัย ก่อนจะเชื่อหรือส่งต่อ เราขอชวนคุณมาตรวจสอบ ใน 2 ช่องทางคือ</p>
                    <ol>
                        <li><a href="#website">ตรวจสอบบนเว็บไซต์ cofact.org</a></li>
                        <li><a href="#line">ตรวจสอบใน LINE @cofact</a></li>
                    </ol>

                    <p>วิธีการ Post หรือ Comment ข่าวหรือบทความบนเว็บไซต์</p>
                    <ol>
                        <li><a href="#post">วิธี Post ข่าวที่ต้องการตรวจสอบบนเว็บไซต์</a></li>
                        <li><a href="#comment">วิธี Comment ข่าวหรือข้อความบนเว็บไซต์</a></li>
                    </ol>
                    </div>
                    <hr />

                    <div className="py-2">
                        <h3 id="website">วิธีตรวจสอบข่าวลวงบนเว็บไซต์ cofact.org</h3>
                        <ol>
                            <li>เข้าไปที่เว็บไซต์ <a href="https://cofact.org" target="_blank">https://cofact.org</a></li>
                            <li><strong>พิมพ์ข้อความที่คุณต้องการตรวจสอบในกล่องค้นหา</strong> แล้วกด <strong>ค้นหา</strong> <br />
                            <img 
                                src={`${require('/static/img/howto/howto-01.png')}`}
                                className={`img-fluid my-3 shadow`}
                            /></li>
                        <li>สามารถ <strong>ค้นหาตามหมวดหมู่</strong> โดยการคลิกเลือกหมวดหมู่ที่ถูกนำเสนอไว้ เช่น โควิด 2019 
                            หากมีผู้ใช้ท่านอื่นพูดถึงเรื่องที่ท่านสนใจผ่านการ Post และ Comment ไว้ในระบบแล้ว เรื่องนั้นจะถูกดึงขึ้นมา<br />
                            <img 
                                src={`${require('/static/img/howto/howto-02.png')}`}
                                className={`img-fluid my-3 shadow`}
                            />
                        </li>
                        <li>กดเข้าไปดูรายละเอียดข้อความนั้น จะมีความคิดเห็นต่าง ๆ เพื่อให้ผู้อ่านได้ตัดสินใจเพิ่มเติมได้ และสังเกตที่มาตรวัดระดับ 
                            จะมีลูกศรีชึ้ (จากแดงไปเขียว หมายถึงข้อความลวงไปถึงความข้อความจริง)
                            <img 
                                src={`${require('/static/img/howto/howto-03.png')}`}
                                className={`img-fluid my-3 shadow`}
                            />
                        </li>

                        </ol>
                       
                    </div>
                    <hr />
                    <div className="py-4">
                        <h3 id="line">วิธีตรวจสอบข่าวลวงใน LINE @cofact</h3>
                        <ol>
                            <li>เปิดเเอปพลิเคชันไลน์ จากนั้นทำการค้นหาเพื่อน พิมพ์ช่อง LINE ID ว่า <strong>@cofact</strong> จะปรากฎ "Cofact" ให้เพิ่มเพื่อนทันที
                                <div className="col-12 col-sm-8 col-md-5 p-0 m-0">
                                    <img 
                                        src={`${require('/static/img/howto/howto-line-01.png')}`}
                                        className={`img-fluid my-3 shadow`}
                                    />
                                </div>
                            </li>
                            <li>ในช่องเเชทจะปรากฎข้อความเเสดงการทักทาย คุณสามารถส่งข้อความ ที่คุณสงสัยลงในระบบได้เลย Cofact จะทำการดึงข้อมูลที่เคยมีคนกล่าวถึงไว้ในระบบออกมาให้ท่านตรวจสอบ
                                <div className="col-12 col-sm-8 col-md-5 p-0 m-0">
                                    <img 
                                        src={`${require('/static/img/howto/howto-line-02.png')}`}
                                        className={`img-fluid my-3 shadow`}
                                    />
                                </div>
                            </li>
                            <li>ถ้าใน Cofact มีข้อความคล้ายกับที่สงสัย จะปรากฏตัวอย่างข้อความให้เลือก เลื่อนไปดูข้อความที่สนใจ ถ้าต้องการดูรายละเอียด กด <strong>เลือกอันนี้</strong>
                                <div className="col-12 col-sm-8 col-md-5 p-0 m-0">
                                    <img 
                                        src={`${require('/static/img/howto/howto-line-03.jpg')}`}
                                        className={`img-fluid my-3 shadow`}
                                    />
                                </div>
                            </li>
                            <li>แชทบอทจะสรุปให้ดูว่าข้อความที่เลือกนี้ มีคนให้ความเห็นว่าจริงหรือหลอกลวงกี่ความเห็น และมีตัวอย่างแต่ละความเห็นให้ดู หากต้องการอ่านความเห็นใด กด <strong>อ่านความเห็นนี้</strong>
                                <div className="col-12 col-sm-8 col-md-5 p-0 m-0">
                                    <img 
                                        src={`${require('/static/img/howto/howto-line-04.jpg')}`}
                                        className={`img-fluid my-3 shadow`}
                                    />
                                </div>
                            </li>
                            <li>หากท่านค้นหาข่าวลวงในระบบแล้วไม่พบ แสดงว่ายังไม่มีใครพูดถึงในประเด็นนี้ เราขอชวนคุณเข้าไป Post ตั้งหัวข้อใหม่ที่ <a href="https://cofact.org" target="_blank">https://cofact.org</a></li>
                        </ol>
                    </div>
                    <hr />
                    <div className="py-4">
                        <h3 id="post">วิธี Post ข่าวที่ต้องการตรวจสอบบนเว็บไซต์</h3>
                        <ol>
                            <li>เข้าไปที่เว็บไซต์ <a href="https://cofact.org" target="_blank">https://cofact.org</a></li>
                            <li>กดปุ่ม สมัครสมาชิก ที่อยู่มุมขวาบน  
                                <div className="col-12 col-sm-8 col-md-5 p-0 m-0">
                                    <img 
                                        src={`${require('/static/img/howto/howto-web-00.png')}`}
                                        className={`img-fluid my-3 shadow`}
                                    />
                                </div>
                            </li>
                            <li>ใส่อีเมล และพาสเวิร์ด กดปุ่ม สมัครสมาชิก หรือจะเชื่อมต่อผ่าน Facebook ก็ได้เช่นกัน
                                <div className="col-12 col-sm-8 col-md-5 p-0 m-0">
                                    <img 
                                        src={`${require('/static/img/howto/howto-web-01.png')}`}
                                        className={`img-fluid my-3 shadow`}
                                    />
                                </div>
                            </li>
                            <li>
                            ใส่คำค้นหา หากคำที่ค้นหาไม่ตรงกับที่มีในระบบ ให้กดปุ่ม สร้างข้อความ ซึ่งจะอยู่ส่วนล่างของหน้าเว็บ <br />
                            <img 
                                src={`${require('/static/img/howto/howto-post-01.png')}`}
                                className={`img-fluid my-3 shadow`}
                            /><br />
                            ท่านจะสามารถเข้าไปสร้าง Post ใหม่ ซึ่งมี 4 ส่วน คือ<br />
                            <img 
                                src={`${require('/static/img/howto/howto-post-02.png')}`}
                                className={`img-fluid my-3 shadow`}
                            /><br />
                                <ul>
                                    <li><strong>หัวข้อ</strong> (หมายถึง หัวข้อข่าวหรือข้อความที่ต้องการตรวจสอบ เป็นลักษณะการตั้งคำถาม) จะใส่หรือไม่ก็ได้</li>
                                    <li><strong>เนื้อหา</strong> (หมายถึง รายละเอียดของข่าวหรือข้อความที่ต้องการตรวจสอบ จากที่ได้เห็นหรือได้ยินมา) จำเป็นต้องกรอกข้อมูล</li>
                                    <li><strong>ลิงก์ไปยังต้นทางข้อความ</strong> (หมายถึง หากคุณมีลิงก์แหล่งที่มาของข้อความที่อ้างถึง ขอให้ Copy ลิงก์นั้นแล้วนำมาวางในช่องนี้ หากไม่มีไม่ต้องใส่)</li>
                                    <li><strong>เหตุผล</strong> (หมายถึง ให้เหตุผลว่าทำไมคุณจึงสนใจ หรือสงสัยข้อความนี้ว่าอาจจะเป็นข่าวลวง)</li>
                                </ul>
                                เมื่อใส่ครบทั้ง 4 ส่วนนี้แล้ว ขอแนะนำให้คุณใช้เวลาตรวจทานอย่างรอบคอบ เช่น ตรวจการสะกดคำ แล้วจึงกดปุ่ม <strong><u>ส่งข้อความใหม่</u></strong> จะปรากฏ Post ใหม่ของท่านในระบบ และรอให้คนมา Comment เพื่อให้ข้อมูลหรือแสดงความคิดเห็น
                            </li>
                        </ol>
       
                    </div>
                    <hr />
                    <div className="py-4">
                        <h3 id="comment">วิธี Comment ข่าวหรือข้อความบนเว็บไซต์</h3>
                        <ol>
                            <li>เข้าไปที่เว็บไซต์ <a href="https://cofact.org" target="_blank">https://cofact.org</a> และ เข้าสู่ระบบ (หากยังไม่เป็นสมาชิกต้องสมัครสมาชิกก่อน)</li>
                            <li>ค้นหาเรื่องที่ต้องการ เมื่อค้นหาเรื่องที่สนใจพบแล้ว คลิกเข้าไปอ่าน และเลื่อนลงมาส่วนล่างสุด จะเห็นส่วน <strong>เพิ่มความเห็นใหม่ </strong>
                                <img 
                                    src={`${require('/static/img/howto/howto-comment-01.png')}`}
                                    className={`img-fluid my-3 shadow`}
                                />
                            </li>
                            <li>
                            ให้กดเข้าไปที่แท็บ เขียนความเห็น แล้วคลิกเลือกให้ความเห็นว่าเรื่องที่เรา Comment นั้นมีลักษณะเป็นอย่างไรโดยมีตัวเลือก 4 ประเภท ดังนี้
                                <ul>
                                    <li><strong>มีเนื้อหาที่เป็นจริงทั้งหมด</strong> (หมายถึง เรื่องนี้มีข้อมูลหรือแหล่งอ้างอิงที่น่าเชื่อถือว่าจะเป็นความจริง)</li>
                                    <li><strong>มีเนื้อหาที่เป็นจริงบางส่วน</strong> (หมายถึง เรื่องนี้มีเนื้อหาบางส่วนเป็นจริง แต่บางส่วนก็ไม่จริง หรือยังไม่รู้)</li>
                                    <li><strong>มีเนื้อหาที่หลอกลวง</strong> (หมายถึง เรื่องนี้ไม่เป็นความจริง หรือมีข้อมูลที่คลาดเคลื่อนจากความจริง)</li>
                                    <li><strong>ไม่อยู่ในขอบเขตการตรวจสอบ</strong> (หมายถึง เรื่องนี้ไม่ใช่ข่าวที่อยู่ในวิสัยที่จะตรวจสอบได้)</li>
                                    <li><strong>มีความเห็นส่วนตัว</strong> (หมายถึง เรื่องนี้เป็นความคิดเห็นส่วนตัว ไม่ใช่สิ่งที่กล่าวอ้างว่าเป็นข้อเท็จจริง)</li>
                                </ul>
                                <strong>จากนั้นใส่ความเห็น และลิงก์ที่มาของข้อมูลที่เราอ้างอิงสำหรับความเห็นนี้</strong> ที่กล่องใส่ข้อความ ตรวจทานดีแล้ว จึงกดปุ่ม <strong>ส่งความเห็น</strong>
                            </li>
                        </ol>
       

                        
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <style jsx>
            {`
              
              /* Section content */

              .section-content {
                background: #fff;
                margin: 1rem 0 0;
                
              }


              @media screen and (min-width: 768px) {
                .section-content {
                  padding-bottom: 2rem;
                }
              }

              .content {
                padding: 3rem 0;
              }

              .content p, ol, ul {
                font-size: 1.2rem;
                line-height: 1.45em;
                font-weight: 300;
              }


             

            `}
          </style>
        </AppLayout>
      </div>
    );
  }
}

export default HowtoPage;
