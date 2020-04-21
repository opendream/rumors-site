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
          <div className={`head-left d-flex align-items-center w-100`}>
            <Link href="/">
              <a className="logo" href="/">
                <div>
                  <img
                    src={`${require('./images/logo.png')}`}
                    className={`img-fluid`}
                  />
                </div>
                <h1>{i18n.t('realOrFake')}</h1>
              </a>
            </Link>
            <div className="ml-auto d-block d-md-none">
              <nav role="navigation">
                <div id="menuToggle">
                  <input type="checkbox" />

                  <span />
                  <span />
                  <span />

                  <div id="menu">
                    <div className="nav">
                      {user && (user.get('isStaff') || user.get('belongTo')) ? 
                      <Link href="/create">
                        <a className={`nav-item ${pathname == '/create'? 'active': ''}`}>{i18n.t('createArticle')}</a>
                      </Link>
                      : ``}
                      <Link href="/articles">
                        <a className={`nav-item ${pathname == '/articles'? 'active': ''}`}>{i18n.t('articles')}</a>
                      </Link>
                      <Link href="/replies">
                        <a className={`nav-item ${pathname == '/replies'? 'active': ''}`}>{i18n.t('replies')}</a>
                      </Link>
                      {user && user.get('isStaff') ? 
                      <>
                        <Link href="/users">
                          <a className={`nav-item ${pathname == '/users'? 'active': ''}`}>{i18n.t('users')}</a>
                        </Link>
                        <Link href="/tags">
                          <a className={`nav-item ${pathname == '/tags'? 'active': ''}`}>หมวดหมู่</a>
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
            <div className="ml-auto d-none d-md-flex align-items-center">
              <div className="nav">
                {user && (user.get('isStaff') || user.get('belongTo')) ? 
                <Link href="/create">
                  <a className={`nav-item ${pathname == '/create'? 'active': ''}`}>{i18n.t('createArticle')}</a>
                </Link>
                : ``}
                <Link href="/articles">
                  <a className={`nav-item ${pathname == '/articles'? 'active': ''}`}>{i18n.t('articles')}</a>
                </Link>
                <Link href="/replies">
                  <a className={`nav-item ${pathname == '/replies'? 'active': ''}`}>{i18n.t('replies')}</a>
                </Link>
                <Link href="/howto">
                  <a className={`nav-item ${pathname == '/howto'? 'active': ''}`}>{i18n.t('How to use')}</a>
                </Link>
                {user && user.get('isStaff') ? (
                <>
                  <Link href="/users">
                    <a className={`nav-item ${pathname == '/users'? 'active': ''}`}>{i18n.t('users')}</a>
                  </Link>
                  <Link href="/tags">
                    <a className={`nav-item ${pathname == '/tags'? 'active': ''}`}>หมวดหมู่</a>
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
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`


        h1 {
          display: block;
          text-indent: -999em;
          overflow: hidden;
          line-height: 1.2;
          height: 0;
          margin: 0;
        }
        .logo {
          width: 95px;
        }
        .logo img { width: 70px; }

        @media screen and (min-width: 768px) {
          .logo img {
            width: 95px;
          }
        }
     
        .nav {
          font-size: 1.25rem;
          padding: 5px 10px;
        }
        .nav-item {
          margin-right: 1.5em;
          color: #fff;
          border-bottom: 2px solid transparent;
        }
        .nav-item:hover, 
        .nav-item:focus,
        .nav-item:active {
          border-bottom: 2px solid currentColor;
          text-decoration: none;
        }
        .nav-item.active {
          border-bottom: 2px solid currentColor;
          text-decoration: none;
        }

        .navbar {
          padding: 1rem;
        }

        /* menu toggle */

          #menuToggle {
            display: block;
            position: relative;
            top: 0;
            right: 0;
            padding: 20px 0;
            z-index: 1;
            -webkit-user-select: none;
            user-select: none;
          }
          #menuToggle .nav { margin-bottom: 1rem; }
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
            height: 32px;
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
            width: 30px;
            height: 3px;
            margin-bottom: 5px;
            position: relative;
            background: #cdcdcd;
            border-radius: 3px;
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
            transform: rotate(-45deg) translate(0, -1px);
          }
          
          /*
           * Make this absolute positioned
           * at the top left of the screen
           */
          #menu {
            visibility: hidden;
            position: absolute;
            width: 290px;
            margin: 0;
            padding: 15px;
            top: 0;
            right: 0;
            
            background: #fff;
            list-style-type: none;
            -webkit-font-smoothing: antialiased;
            /* to stop flickering of text in safari */
            
            transform-origin: 0% 0%;
            transform: translate(0, -100%);
            
            transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
          }
          
          #menu .nav .nav-item {
            padding: 10px 0 0;
            font-size: 22px;
            display: block;
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
