import React from 'react';
import { PROJECT_HACKFOLDR, CONTACT_EMAIL } from '../../constants/urls';
import GoogleWebsiteTranslator from 'components/GoogleWebsiteTranslator';
import i18n from '../../i18n';
import { Link } from 'routes';

export default function AppFooter() {
  return (
    <footer>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center">
          <Link route="index">
            <a className="logo" href="/">
              <div>
                <img src={`${require('./images/logo.png')}`} className={`img-fluid logo-footer`} />
              </div>
            </a>
          </Link>
          <ul className="menu-footer">
            <li><Link route="articles"><a>ค้นหาข่าวลวง</a></Link></li>
            <li><Link route="replies"><a>รายการความคิดเห็น</a></Link></li>
            <li><Link route="about"><a>ABOUT</a></Link></li>
            <li><Link route="policy"><a>POLICY</a></Link></li>
            <li><Link route="index"><a className="d-none">นโยบายการใช้งาน</a></Link></li>
            <li><Link route="index"><a className="d-none">เกี่ยวกับเรา</a></Link></li>
          </ul>
          <div className="ml-auto">
            <img src={`${require('static/img/powerby-g@2x.png')}`} className={`logo-powerby img-fluid d-none`} />
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
      
      {/* <GoogleWebsiteTranslator /> */}
      <style jsx>{`
        footer {
          // background: #343A40;
          background: #343A40 url("static/img/bg-fill-footer@2x.png") no-repeat 180% -15px;
          background-size: 70%;
          padding: 3rem 1rem;
          text-align: center;
          color: white;
        }
        .logo {
          // flex: 0 0 100%;
          flex: 0 0 auto;
          text-align: left;
        }
        .logo-footer {
          width: 70px;
          margin-right: 1rem;
        }
        @media screen and (min-width: 768px) {
          .logo-footer {
            width: 120px;
            margin-right: 1rem;
            
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
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
          
        }
        .menu-footer li a { 
          color: #fff;
        }

        @media screen and (min-width: 768px) {
          footer {
            background: #343A40 url("static/img/bg-fill-footer@2x.png") no-repeat 85% -15px;
            background-size: contain;
          }
          .menu-footer {
            margin: 0;
          }
          .menu-footer li {
            text-align: left;
            display: inline-block;
            padding: 0 1rem;
            margin-bottom: 0;
            font-size: 1.15rem;
          }
          .logo {
            flex: 0 0 auto;
          }
        }


      `}</style>
    </footer>
  );
}
