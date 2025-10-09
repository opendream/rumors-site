import React from 'react';
import { connect } from 'react-redux';
import { EDITOR_FACEBOOK_GROUP, PROJECT_HACKFOLDR } from 'constants/urls';
import Link from 'next/link';
import { useRouter } from 'next/router'

import { showDialog, logout, updateName } from 'ducks/auth';
import UserName from './UserName';
import i18n from '../../i18n';
import { withRouter } from 'next/dist/lib/router';

function AppHeader({
  user,
  isLoadingAuth,
  onLoginClick,
  onLogoutClick,
  onUserNameUpdate,
  router: {pathname},
}) {

  return (
    <header className={`navbar navbar-expand-lg navbar-dark`}>
      <div className={`container-fluid`}>
        <div className={`d-flex align-items-start w-100`}>
          <div className={`head-left d-flex w-100 align-items-center`}>
            <Link href="/">
              <a className="logo" href="/">
                <div>
                  <img
                    src={`${require('./images/cofact-logo.png')}`}
                    className={`img-fluid `}
                  />
                </div>
                <h1>{i18n.t('realOrFake')}</h1>
              </a>
            </Link>
            <div className="ml-auto d-flex d-lg-none align-items-end flex-column z-2">
              <nav role="navigation" className="mobile-nav">
                <ul className="header-social">
                  <li className="ic-line"><a href="https://line.me/R/ti/p/%40Cofact" target="_blank" rel="noopener">@cofact</a></li>
                  <li className="ic-facebook"><a href="https://www.facebook.com/CofactThailand">Cofact โคแฟค</a></li>
                  <li className="ic-twitter"><a href="https://twitter.com/CofactThailand" target="_blank" rel="noopener">@CofactThailand</a></li>
                  <li className="ic-youtube"><a href="https://www.youtube.com/channel/UC5BY-W7O3bByf5z-17M7GQA" target="_blank" rel="noopener">Cofact Coform</a></li>
                  <li className="ic-tiktok"><a href="https://www.tiktok.com/@CoFactThailand" target="_blank" rel="noopener">CoFactThailand</a></li>
                  <li className="ic-ig"><a href="https://www.instagram.com/cofactthailand/" target="_blank" rel="noopener">@cofactthailand</a></li>
                </ul>
                <div id="menuToggle">
                  <input type="checkbox" />

                  <span />
                  <span />
                  <span />

                  <div id="menu">
                    <div className="nav">
                      {user && (user.get('isStaff') || user.get('belongTo') || true) ?
                      <Link href="https://cofact.org/create">
                        <a className={`nav-item ${pathname == 'https://cofact.org/create'? 'active': ''}`}>{i18n.t('createArticle')}</a>
                      </Link>
                      : ``}
                      <Link href="https://cofact.org/articles">
                        <a className={`nav-item ${pathname == 'https://cofact.org/articles'? 'active': ''}`}>{i18n.t('articles')}</a>
                      </Link>
                      {/* <Link href="https://cofact.org/replies">
                        <a className={`nav-item ${pathname == 'https://cofact.org/replies'? 'active': ''}`}>{i18n.t('replies')}</a>
                      </Link> */}
                     <a className="nav-item" href="https://blog.cofact.org/quiz">{i18n.t('Quiz')}</a>
                     <a className="nav-item" href="https://elearning.cofact.org/share/course/828c9526-c54a-4b4b-a6b1-733ea9455d13" target='_blank'>{i18n.t('E-Learning')}</a>
                     <a className="nav-item" href="https://blog.cofact.org/category/articles">{i18n.t('Blog')}</a>
                     <a className="nav-item" href="https://blog.cofact.org/category/event">{i18n.t('Event')}</a>
                     <a className="nav-item" href="https://blog.cofact.org/category/video">{i18n.t('Media')}</a>
                     {/* <a className="nav-item" href="https://blog.cofact.org/category/journal">{i18n.t('Journal')}</a> */}
                     <a className="nav-item" href="https://blog.cofact.org/about">{i18n.t('About Us')}</a>

                      {/* <Link href="/about">
                        <a className={`nav-item ${pathname == '/about-us'? 'active': ''}`}>About Us</a>
                      </Link> */}
                      {/* <a className="nav-item" href="https://blog.cofact.org/category/fact-checks/">Top Fact Checks</a> */}
                      {/* <a className="nav-item" href="https://blog.cofact.org/fake-news/">ข่าวลวงที่พบบ่อย</a>
                      <a className="nav-item" href="https://blog.cofact.org/category/infographic/">อินโฟกราฟิก</a>
                      <a className="nav-item" href="https://blog.cofact.org/vocabulary/">แนะนำคำศัพท์</a> */}
                      {user && user.get('isStaff') ?
                      <>
                        <Link href="https://cofact.org/users">
                          <a className={`nav-item ${pathname == 'https://cofact.org/users'? 'active': ''}`}>{i18n.t('users')}</a>
                        </Link>
                        <Link href="https://cofact.org/tags">
                          <a className={`nav-item ${pathname == 'https://cofact.org/tags'? 'active': ''}`}>หมวดหมู่</a>
                        </Link>
                      </>
                      : ``}
                      {EDITOR_FACEBOOK_GROUP ? (
                        <a
                          href={EDITOR_FACEBOOK_GROUP}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-item hidden-xs"
                        >
                          FB {i18n.t('editorHelp')}
                        </a>
                      ) : (
                        ``
                      )}
                      {PROJECT_HACKFOLDR ? (
                        <a
                          href={PROJECT_HACKFOLDR}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-item hidden-xs"
                        >
                          {i18n.t('projectIntroduction')}
                        </a>
                      ) : (
                        ``
                      )}
                    </div>
                    <UserName
                      isLoading={isLoadingAuth}
                      user={user}
                      onLoginClick={onLoginClick}
                      onLogoutClick={onLogoutClick}
                      onUpdate={onUserNameUpdate}
                    />
                  </div>
                </div>
              </nav>
            </div>
            <div className="ml-auto d-none d-lg-block">
              <div className="">
                <div className="social-media-header justify-content-end d-flex"></div>
              </div>

              <div className="d-flex align-items-center justify-content-end">
              <div className="nav">
                {user && (user.get('isStaff') || user.get('belongTo') || true) ?
                <Link href="https://cofact.org/create">
                  <a className={`nav-item ${pathname == 'https://cofact.org/create'? 'active': ''}`}>{i18n.t('createArticle')}</a>
                </Link>
                : ``}
                <Link href="https://cofact.org/articles">
                  <a className={`nav-item ${pathname == 'https://cofact.org/articles'? 'active': ''}`}>{i18n.t('articles')}</a>
                </Link>
                {/* <Link href="https://cofact.org/replies">
                  <a className={`nav-item ${pathname == 'https://cofact.org/replies'? 'active': ''}`}>{i18n.t('replies')}</a>
                </Link> */}
                {/* <a className="nav-item" href="https://blog.cofact.org/category/news/">{i18n.t('News')}</a> */}
                <a className="nav-item" href="https://blog.cofact.org/quiz">{i18n.t('Quiz')}</a>
                <a className="nav-item" href="https://elearning.cofact.org/share/course/828c9526-c54a-4b4b-a6b1-733ea9455d13" target='_blank'>{i18n.t('E-Learning')}</a>
                <a className="nav-item" href="https://blog.cofact.org/category/articles">{i18n.t('Blog')}</a>
                <a className="nav-item" href="https://blog.cofact.org/category/event">{i18n.t('Event')}</a>
                <a className="nav-item" href="https://blog.cofact.org/category/video">{i18n.t('Media')}</a>
                {/* <a className="nav-item" href="https://blog.cofact.org/category/journal">{i18n.t('Journal')}</a> */}
                <a className="nav-item" href="https://blog.cofact.org/about">{i18n.t('About Us')}</a>
              
                {user && user.get('isStaff') ? (
                <>
                  <Link href="https://cofact.org/users">
                    <a className={`nav-item ${pathname == 'https://cofact.org/users'? 'active': ''}`}>{i18n.t('users')}</a>
                  </Link>
                  <Link href="https://cofact.org/tags">
                    <a className={`nav-item ${pathname == 'https://cofact.org/tags'? 'active': ''}`}>หมวดหมู่</a>
                  </Link>
                </>
                ) : (
                  ``
                )}
                {EDITOR_FACEBOOK_GROUP ? (
                  <a
                    href={EDITOR_FACEBOOK_GROUP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-item hidden-xs"
                  >
                    FB {i18n.t('editorHelp')}
                  </a>
                ) : (
                  ``
                )}
                {PROJECT_HACKFOLDR ? (
                  <a
                    href={PROJECT_HACKFOLDR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-item hidden-xs"
                  >
                    {i18n.t('projectIntroduction')}
                  </a>
                ) : (
                  ``
                )}
              </div>
              <UserName
                isLoading={isLoadingAuth}
                user={user}
                onLoginClick={onLoginClick}
                onLogoutClick={onLogoutClick}
                onUpdate={onUserNameUpdate}
              />
                <div className="social-media-header justify-content-end d-flex">
                  <ul className="header-social">
                    <li className="ic-line"><a href="https://line.me/R/ti/p/%40Cofact" target="_blank" rel="noopener">@cofact</a></li>
                    <li className="ic-facebook"><a href="https://www.facebook.com/CofactThailand">Cofact โคแฟค</a></li>
                    <li className="ic-twitter"><a href="https://twitter.com/CofactThailand" target="_blank" rel="noopener">@CofactThailand</a></li>
                    <li className="ic-youtube"><a href="https://www.youtube.com/channel/UC5BY-W7O3bByf5z-17M7GQA" target="_blank" rel="noopener">Cofact Coform</a></li>
                    <li className="ic-tiktok"><a href="https://www.tiktok.com/@cofactthailand" target="_blank" rel="noopener">CoFactThailand</a></li>
                    <li className="ic-ig"><a href="https://www.instagram.com/cofactthailand/" target="_blank" rel="noopener">@cofactthailand</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .z-2 { z-index: 2; }
        h1 {
          display: block;
          text-indent: -999em;
          overflow: hidden;
          line-height: 1.2;
          height: 0;
          margin: 0;
        }

        .logo img { width: 40px; }

        @media screen and (min-width: 992px) {
          .logo img {
            width: 50px;
          }
        }
     
        .nav {
          font-size: 1rem;
          justify-content: flex-end;
        }
        @media screen and (min-width: 992px) {
          .nav {
            margin-right: 1rem;
            // max-width: 700px;
          }
        }
        @media screen and (min-width: 1100px) {
          .nav {
            margin-right: 2rem;
          }
        }
        .nav-item:hover, 
        .nav-item:focus,
        .nav-item:active {
          text-decoration: underline !important;
        }
        .nav-item.active {
          text-decoration: underline !important;
        }
        @media screen and (min-width: 991px) {
          .nav-item {
            font-size: 14px;
            margin-left: 1rem;
            border-bottom: 2px solid transparent;
          }
        }
        @media screen and (min-width: 1100px) {
          .nav-item {
          font-size: 16px;
            margin-left: 2rem;
           
          }
          .nav-item:first-child {
            margin-left: 0;
          }
          .nav-item:hover, 
          .nav-item:focus,
          .nav-item:active {
            border-bottom: 2px solid currentColor;
            text-decoration: none !important;
          }
          .nav-item.active {
            border-bottom: 2px solid currentColor;
            text-decoration: none !important;
          }
        }
        

        .navbar {
          background: #fff;
          padding: 0.75rem;
        }

        /* menu toggle */
          .mobile-nav {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 1rem;
          }
          #menuToggle {
            display: block;
            position: relative;
            top: 0;
            right: 0;
            padding: 0 0 0;
            z-index: 1;
            -webkit-user-select: none;
            user-select: none;
          }
          #menuToggle .nav { margin-bottom: 0; }
          #menuToggle .nav .nav-item {
            font-size: 18px !important;
          }
          
          #menuToggle a {
            text-decoration: none;
            color: #232323 !important;
            transition: color 0.3s ease;
          }
          
          #menuToggle a:hover {
            color: tomato;
          }
          
          #menuToggle input {
            display: block;
            width: 40px;
            height: 50px;
            position: absolute;
            top: -7px;
            left: -5px;
            cursor: pointer;
            opacity: 0; /* hide this */
            z-index: 2; /* and place it over the hamburger */
            -webkit-touch-callout: none;
          }
          
          /*
           * Just a quick hamburger
           */
          #menuToggle span {
            display: block;
            width: 28px;
            height: 3px;
            margin-bottom: 5px;
            position: relative;
            background: #000;
            border-radius: 10px;
            z-index: 1;
            transform-origin: 4px 0px;
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                        opacity 0.55s ease;
          }
          
          #menuToggle span:first-child {
            transform-origin: 0% 0%;
          }
          
          #menuToggle span:nth-last-child(2) {
            transform-origin: 0% 100%;
            margin-bottom: 0;
          }
          
          #menuToggle input:checked ~ span {
            opacity: 1;
            transform: rotate(45deg) translate(-2px, -1px);
            background: #232323;
          }
          #menuToggle input:checked ~ span:nth-last-child(3) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
          }
          
          #menuToggle input:checked ~ span:nth-last-child(2) {
            transform: rotate(-45deg) translate(1px, -2px);
          }
          
          /*
           * Make this absolute positioned
           * at the top left of the screen
           */
          #menu {
            visibility: hidden;
            position: absolute;
            width: 350px;
            min-height: 100vh;
            margin: 0;
            padding: 50px 0 0;
            top: -10px;
            right: -10px;
            background: #fff;
            list-style-type: none;
            // -webkit-font-smoothing: antialiased;
            /* to stop flickering of text in safari */
            
            transform-origin: 0% 0%;
            transform: translate(0, -100%);

            transition: transform 0.5s, right 0.5s;
          }
          
          #menu .nav .nav-item {
            padding: 10px 15px;
            font-size: 22px;
            display: block;
            border-top: 1px solid #d3d3d3;
          }
          #menu .nav {
            padding: 0;
            display: block;
            
          }
          
          /*
           * And let's slide it in from the left
           */
          #menuToggle input:checked ~ #menu {
            transform: none;
            visibility: visible;
          }

          #menuToggle #menu  {
            box-shadow: 1px 2px 5px -2px rgba(0,0,0,0.5)
          } 
        }
        ul.header-social {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
        }
        ul.header-social li {
          margin: 0 0 0 5px;
          width: 35px;
          height: 35px;
        }
        @media screen and (max-width: 767px) {
          ul.header-social li {
            width: 25px;
            height: 25px;
          }
        }
        ul.header-social li a {
            display: block;
            text-indent: -999em;
            height: 27px;
        }
        ul.header-social li.ic-twitter a {
          background: url("/static/img/icon/ic-twitter-01.png") no-repeat center center;
          background-size: contain;
        }
        ul.header-social li.ic-youtube a {
          background: url("/static/img/icon/ic-youtube-01.png") no-repeat center center;
          background-size: contain;
        }
        ul.header-social li.ic-line a {
          background: url("/static/img/icon/ic-line-01.png") no-repeat center center;
          background-size: contain;
        }
        ul.header-social li.ic-tiktok a {
          background: url("/static/img/icon/ic-tiktok-01.png") no-repeat center center;
          background-size: contain;
        }
        ul.header-social li.ic-facebook a {
          background: url("/static/img/icon/ic-facebook-01.png") no-repeat center center;
          background-size: contain;
        }
        ul.header-social li.ic-ig a {
          background: url("/static/img/icon/ic-ig.png") no-repeat center center;
          background-size: contain;
        }

        .nav-top {
          list-style: none;
          display: flex;
          margin: 0 1.75rem 0 1rem;
        }
        .nav-top li {
          margin: 0 0 0 1.5rem;
          font-size: 1.05rem;
        }
        .nav-top a { color: #686868}\

        
      `}</style>
    </header>
  );
}

function mapStateToProps({ auth }) {
  return {
    user: auth.get('user'),
    isLoadingAuth: auth.getIn(['state', 'isLoading']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoginClick(title) {
      dispatch(showDialog(title));
    },
    onLogoutClick() {
      dispatch(logout());
    },
    onUserNameUpdate(name) {
      dispatch(updateName(name));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppHeader));
