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
    <header className="root">
      <a className="logo hidden-xs" href="/">
        <div>
          <img src={`${require('./images/logo.png')}`}></img>
        </div>
        <h1>{i18n.t("realOrFake")}</h1>
      </a>
      <nav className="nav">
        <Link route="articles">
          <a className="nav-item">{i18n.t("articles")}</a>
        </Link>
        <Link route="replies">
          <a className="nav-item">{i18n.t("replies")}</a>
        </Link>
        <Link route="users">
          <a className="nav-item">{i18n.t("users")}</a>
        </Link>
        <a
          href={EDITOR_FACEBOOK_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item hidden-xs"
        >
          FB {i18n.t("editorHelp")}
        </a>
        <a
          href={PROJECT_HACKFOLDR}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item hidden-xs"
        >
          {i18n.t("projectIntroduction")}
        </a>
      </nav>
      <UserName
        isLoading={isLoadingAuth}
        user={user}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        onUpdate={onUserNameUpdate}
      />
      <style jsx>{`
        .root {
          display: flex;
          padding: 1rem 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.4);
          flex-direction: column;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        @media screen and (min-width: 576px) {
          .root {
            flex-direction: row;
            align-items: center;
            flex-wrap: nowrap;
          }
        }
        h1 {
          display: block;
          text-indent: -999em;
          overflow: hidden;
          line-height: 1.2;
          height: 0;
          margin: 0;
        }
        .logo {
          margin-right: 16px;
          width: 100%;
          max-width: 100px;
        }
        .logo > div {
          position: relative;
          display: block;
          width: 100%;
          padding: 0;
          overflow: hidden;
        }
        .logo > div:before {
          content: "";
          display: block;
          padding-top: 100%;
        }
        .logo > div > img {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: auto;
        }
        .nav {
          margin-right: auto;
          display: flex;
        }
        .nav-item {
          padding: 8px;
          border-left: 1px dashed #ccc;
        }

        @media screen and (min-width: 768px) {
          .root {
            padding: 1rem 40px;
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
)(AppHeader);
