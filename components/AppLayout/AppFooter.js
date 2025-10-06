import React from 'react';
import { PROJECT_HACKFOLDR, CONTACT_EMAIL } from '../../constants/urls';
import GoogleWebsiteTranslator from 'components/GoogleWebsiteTranslator';
import i18n from '../../i18n';
import { Link } from 'routes';

export default function AppFooter() {
  return (
    <footer>
      <div className="container p-0">
        <div className="d-flex flex-wrap wrapper-footer">
          <ul className='menu-footer'>
            <li><a href='https://cofact.org/articles'>ตรวจสอบข่าว</a></li>
            <li><a href='http://blog.cofact.org/category/what-check'>วันนี้ Cofact เช็คอะไร?</a></li>
            <li><a href='http://blog.cofact.org/category/true-false/'>จริงหรือไม่</a></li>
            <li><a href='http://blog.cofact.org/category/weekly-recommand/'>ข่าวลวงประจำสัปดาห์</a></li>
            <li><a href='http://blog.cofact.org/category/articles/event/'>กิจกรรม</a></li>
            <li><a href='https://blog.cofact.org/category/articles'>{i18n.t('Blog')}</a></li>
            <li><a href='https://blog.cofact.org/category/video'>{i18n.t('Video')}</a></li>
            <li><a href='https://blog.cofact.org/category/journal'>{i18n.t('Journal')}</a></li>
            <li><a href='https://blog.cofact.org/category/infographic'>อินโฟกราฟิก</a></li>
            <li><a href='https://blog.cofact.org/quiz'>Quiz</a></li>
            <li><a href='https://elearning.cofact.org/share/course/828c9526-c54a-4b4b-a6b1-733ea9455d13' target='_blank'>{i18n.t('e-Learning')}</a></li>
            <li><a href='https://blog.cofact.org/vocabulary'>แนะนำคำศัพท์</a></li>
            <li><a href='https://cofact.org/howto'>{i18n.t('How to use')}</a></li>
            <li><a href='https://blog.cofact.org/about' target='_blank'>{i18n.t('About Us')}</a></li>
            <li><a href='https://blog.cofact.org/privacy-policy'>Privacy Policy</a></li>
          </ul>
          <div className="block-widget-footer">
            <h3>ติดตามเรา</h3>
            <ul>
              <li className="ic-mail"><a href="mailto:cofactcoform@gmail.com">cofactcoform@gmail.com</a></li>
              <li className="ic-line"><a href="https://line.me/R/ti/p/%40Cofact" target="_blank" rel="noopener">@cofact</a></li>
              <li className="ic-facebook"><a href="https://www.facebook.com/CofactThailand">Cofact โคแฟค</a></li>
              <li className="ic-twitter"><a href="https://twitter.com/CofactThailand" target="_blank" rel="noopener">@CofactThailand</a></li>
              <li className="ic-youtube"><a href="https://www.youtube.com/channel/UC5BY-W7O3bByf5z-17M7GQA">Cofact Coform</a></li>
              <li className="ic-tiktok"><a href="https://www.tiktok.com/@cofactthailand" target="_blank" rel="noopener">CoFactThailand</a></li>
              <li className="ic-ig"><a href="https://www.instagram.com/cofactthailand/" target="_blank" rel="noopener">@cofactthailand</a></li>
           
            </ul>
          </div>
        </div>

        {/* <p>
          <a href={PROJECT_HACKFOLDR} target="_blank" rel="noopener noreferrer">
            {i18n.t("projectIntroduction")}
          </a>
          ・
          <a href={`mailto:${CONTACT_EMAIL}`}>{i18n.t("contactEmail")}</a>
        </p> */}

      </div>
      
      <div className="footer-logo">
					<div className="d-flex align-items-end mb-2">
						<a className="logo" href="https://cofact.org/">Cofact 2025</a>
						<div className="ml-auto small">
							<span className="mr-3">© Cofact2025</span>
						</div>
					</div>
					

					<img src="/static/img/footer-everyone-is-a-fact-checker.png" alt="cofact" class="img-fluid d-none d-md-block" />
					<img src="/static/img/footer-slogan-sm.png" alt="cofact" class="img-fluid d-block d-md-none" />
			</div>

      {/* <GoogleWebsiteTranslator /> */}
      <style jsx>{`
        footer {
          background: #f5f5f5;
          padding: 3rem 2rem;
          text-align: center;
          color: #000;
        }
          footer a {
            color: #000 !important;
          }
        .logo {
          // flex: 0 0 100%;
          // flex: 0 0 auto;
          // text-align: left;
        }
        .logo-footer {
          width: 80px;
          margin-right: 1rem;
        }
        .menu-footer {
          display: flex;
          flex-wrap: wrap;
        }
        .menu-footer li {
          width: calc((100% / 2) - 20px);
          margin: 1rem 1rem 0.5rem 0rem;
        }
        .wrapper-footer {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          flex-direction: column;
          align-items: flex-start
        }
        @media screen and (min-width: 768px) {
          footer {
            padding: 3rem 1rem;
          }
          .logo-footer {
            width: 100px;
            margin-right: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .wrapper-footer {
            flex-direction: row;
          }
          .menu-footer {
              max-width: 47%;
          }
          .wrapper-footer .logo, 
          .wrapper-footer .menu-footer {
            margin: 2.5rem 0 0;
          }

        }
        @media (min-width: 1280px) {
            .menu-footer {
                max-width: 65%;
            }
        }

        .logo-powerby {
          width: 120px;
        }

        .menu-footer {
          list-style: none;
          padding: 0;
          margin: 1rem 0 0;
          text-align: left;
        }
        .menu-footer li {
          display: block;
          font-size: 1rem;
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          text-align: left;
          
        }
        .menu-footer li a { 
          color: #fff;
        }

        @media screen and (min-width: 768px) {
          footer {
            background: #f5f5f5 url("/static/img/bg-fill-footer@2x.png") no-repeat 85% -15px;
            background-size: 200px;
          }
          .menu-footer {
            margin: 0;
            text-align: right;
          }
          .menu-footer li {
            display: inline-block;
            width: calc((100% / 3) - 40px);
            margin: 0rem 1rem 0.75rem 1rem;
            font-size: 1rem;
          }
        }

        @media screen and (min-width: 1024px) {
          .menu-footer {
            text-align: left;
          }
          .menu-footer li {
            text-align: left;
            width: calc((100% / 3) - 3rem);
          }
        }

        
          .block-widget-footer {
            flex: 1;
            margin: 2rem 0 0;
            
          }
          .block-widget-footer h3 { 
            text-align: left; 
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          @media (min-width: 1024px) {
            .block-widget-footer {
              margin: 0;
            }
          }

          .block-widget-footer ul {
            color: #fff;
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: wrap;
            font-size: 12px;
            font-weight: 400;
            
          }
          @media (min-width: 768px) {
            .block-widget-footer ul {
              font-size: 12px;
            }
          }
          .block-widget-footer ul li {
            flex: 0 0 100%;
            text-align: left;
            min-height: 35px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li {
              flex: 0 0 65%;
            }
          }
          .block-widget-footer ul li::before {
            content: "";
            width: 27px;
            height: 27px;
            background: url("/static/img/icon/ic-facebook.png") no-repeat left center;
            position: absolute;
            background-size: 27px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-mail {
              flex: 0 0 60%;
            }
          }
          .block-widget-footer ul li.ic-mail::before {
            background: url("/static/img/icon/ic-mail.png") no-repeat left center;
            background-size: 27px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-facebook {
              flex: 0 0 60%;
            }
          }
          .block-widget-footer ul li.ic-facebook::before {
            background: url("/static/img/icon/ic-facebook.png") no-repeat left center;
            background-size: 27px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-line {
              flex: 0 0 40%;
            }
          }
          .block-widget-footer ul li.ic-line::before {
            background: url("/static/img/icon/ic-line.png") no-repeat left center;
            background-size: 27px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-twitter {
              flex: 0 0 40%;
            }
          }
          .block-widget-footer ul li.ic-twitter::before {
            background: url("/static/img/icon/ic-twitter.png") no-repeat left center;
            background-size: 27px;
          }
          .block-widget-footer ul li.ic-youtube::before {
            background: url("/static/img/icon/ic-youtube.png") no-repeat left center;
            background-size: 27px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-youtube {
              flex: 0 0 60%;
            }
          }
          .block-widget-footer ul li.ic-tiktok::before {
            background: url("/static/img/icon/ic-tiktok.png") no-repeat left center;
            background-size: 27px;
          }
          .block-widget-footer ul li.ic-ig::before {
            background: url("/static/img/icon/ic-ig-white.png") no-repeat left center;
            background-size: 27px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-tiktok {
              flex: 0 0 40%;
            }
          }
          .block-widget-footer ul li a {
            color: #fff;
            font-weight: 400;
            padding-left: 35px;
          }
          .footer-logo {
            margin-top: 3rem;
          }
          .footer-logo a.logo {
              display: block;
              background: url("/static/img/cofact-logo-black.png") no-repeat center center;
              text-indent: -999em;
              width: 60px;
              height: 60px;
              margin-left: -3px;
              background-repeat: no-repeat;
              background-size: 100%;
          }
          @media (max-width: 768px) {
              .footer-logo a {
                  width: 40px;
                  height: 40px;
              }  
          }

      `}</style>
    </footer>
  );
}
