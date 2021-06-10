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
          <Link route="index">
            <a className="logo text-left" href="/">
              <div>
                <img src={`${require('./images/logo.png')}`} className={`img-fluid logo-footer`} />
              </div>
            </a>
          </Link>
          <ul className="menu-footer">
            <li><Link route="articles"><a>{i18n.t('articles')}</a></Link></li>
            <li><Link route="replies"><a>{i18n.t('replies')}</a></Link></li>
            {/* <li><a href="https://blog.cofact.org/category/news/" target="_blank">{i18n.t('News')}</a></li> */}
            <li><a href="https://blog.cofact.org/category/article/" target="_blank">{i18n.t('Blog')}</a></li>
            {/* <li><a href="https://blog.cofact.org/category/video" target="_blank">{i18n.t('Video')}</a></li> */}
            {/* <li><a href="https://blog.cofact.org/category/journal" target="_blank">{i18n.t('Journal')}</a></li> */}
            {/* <li><a href="https://blog.cofact.org/category/infographic" target="_blank">{i18n.t('Infographic')}</a></li> */}
            {/* <li><a href="https://blog.cofact.org/vocabulary" target="_blank">{i18n.t('Vocabulary')}</a></li> */}
            {/* <li><a href="https://blog.cofact.org/category/article/fake-news" target="_blank">{i18n.t('Fake News')}</a></li> */}
            <li><Link route="howto"><a>{i18n.t('How to use')}</a></Link></li>
            <li><Link route="policy"><a>{i18n.t('Policy')}</a></Link></li>
            {/* <li><a href="https://blog.cofact.org/about" target="_blank">{i18n.t('About Us')}</a></li> */}
            <li><Link route="about-us"><a>About Us</a></Link></li>
          </ul>
          {/* <div className="ml-auto">
            <img src={`${require('static/img/powerby-g@2x.png')}`} className={`logo-powerby img-fluid d-none`} />
          </div> */}
          <div className="block-widget-footer">
            <h3>ติดต่อเรา</h3>
            <ul>
              <li className="ic-mail"><a href="mailto:cofactcoform@gmail.com">cofactcoform@gmail.com</a></li>
              <li className="ic-line"><a href="https://line.me/R/ti/p/%40Cofact" target="_blank" rel="noopener">@cofact</a></li>
              <li className="ic-facebook"><a href="https://www.facebook.com/CofactThailand">Cofact โคแฟค</a></li>
              <li className="ic-twitter"><a href="https://twitter.com/CofactThailand" target="_blank" rel="noopener">@CofactThailand</a></li>
              <li className="ic-youtube"><a href="https://www.youtube.com/channel/UC5BY-W7O3bByf5z-17M7GQA">Cofact Coform</a></li>
              <li className="ic-tiktok"><a href="https://www.tiktok.com/@cofactthailand" target="_blank" rel="noopener">CoFactThailand</a></li>
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
      
      {/* <GoogleWebsiteTranslator /> */}
      <style jsx>{`
        footer {
          // background: #343A40;
          background: #343A40 url("/static/img/bg-fill-footer@2x.png") no-repeat 180% -15px;
          background-size: 70%;
          padding: 3rem 2rem;
          text-align: center;
          color: white;
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
          margin: 1rem 1rem 1rem 0rem;
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
          .menu-footer {
            max-width: 80%;
          }
          
        }
        @media (min-width: 1024px) {
          .wrapper-footer {
            flex-direction: row;
          }
          .menu-footer {
              max-width: 47%;
          }

        }
        @media (min-width: 1280px) {
            .menu-footer {
                max-width: 55%;
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
          margin-bottom: 0.25rem;
          text-align: left;
          
        }
        .menu-footer li a { 
          color: #fff;
        }

        @media screen and (min-width: 768px) {
          footer {
            background: #343A40 url("/static/img/bg-fill-footer@2x.png") no-repeat 85% -15px;
            background-size: 200px;
          }
          .menu-footer {
            margin: 0;
            text-align: right;
          }
          .menu-footer li {
            display: inline-block;
            width: calc((100% / 3) - 20px);
            margin: 0rem 1rem 1rem 1rem;
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
            font-size: 1rem;
            font-weight: 300;
            
          }
          @media (min-width: 768px) {
            .block-widget-footer ul {
              font-size: 1rem;
            }
          }
          .block-widget-footer ul li {
            flex: 0 0 100%;
            text-align: left;
            margin: 0 0 1rem;
            min-height: 35px;
          }
          @media (min-width: 576px) {
            .block-widget-footer ul li {
              flex: 0 0 50%;
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
          @media (min-width: 576px) {
            .block-widget-footer ul li.ic-tiktok {
              flex: 0 0 40%;
            }
          }
          .block-widget-footer ul li a {
            color: #fff;
            font-weight: 300;
            padding-left: 35px;
          }


      `}</style>
    </footer>
  );
}
