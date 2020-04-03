import React from 'react';
import { connect } from 'react-redux';
import { EDITOR_FACEBOOK_GROUP, PROJECT_HACKFOLDR } from 'constants/urls';
import { Link } from 'routes';
import { showDialog, logout, updateName } from 'ducks/auth';
import UserName from './UserName';
import i18n from '../../i18n';

function AppHeader({
  user,
  isLoadingAuth,
  onLoginClick,
  onLogoutClick,
  onUserNameUpdate,
}) {
  return (
    <header className={`navbar navbar-expand-lg navbar-dark`}>
      <div className={`container-fluid`}>
        <div className={`d-flex align-items-start w-100`}>
          <div className={`head-left d-flex align-items-center w-100`}>
            <Link route="index">
              <a className="logo" href="/">
                <div>
                  <img src={`${require('./images/logo.png')}`} className={`img-fluid`} />
                </div>
                <h1>{i18n.t('realOrFake')}</h1>
              </a>
            </Link>
            <nav className="nav ml-auto">
              <Link route="articles">
                <a className="nav-item">{i18n.t('articles')}</a>
              </Link>
              <Link route="replies">
                <a className="nav-item">{i18n.t('replies')}</a>
              </Link>
              {user && user.get('isStaff') ? (
                <Link route="users">
                  <a className="nav-item">{i18n.t('users')}</a>
                </Link>
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
            </nav>
            <UserName
              isLoading={isLoadingAuth}
              user={user}
              onLoginClick={onLoginClick}
              onLogoutClick={onLogoutClick}
              onUpdate={onUserNameUpdate}
            />
          </div>
          {/* <div className={`head-right d-flex`}>
            
          </div> */}
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
        // .logo > div {
        //   position: relative;
        //   display: block;
        //   width: 100%;
        //   padding: 0;
        //   overflow: hidden;
        // }
        // .logo > div:before {
        //   content: '';
        //   display: block;
        //   padding-top: 100%;
        // }
        // .logo > div > img {
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   right: 0;
        //   bottom: 0;
        //   width: 100%;
        //   height: auto;
        // }
        .nav {
          font-size: 1.25rem;
          padding: 5px 10px;
        }
        .nav-item {
          margin-right: 1.5em;
          color: #fff;
          // padding: 8px;
          // border-left: 1px dashed #ccc;
        }
        .nav-item:last-child {
         
          // padding: 8px;
          // border-left: none 0px;
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
)(AppHeader);
