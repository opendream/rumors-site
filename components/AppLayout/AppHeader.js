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
        <h1>{i18n.t("app.header.home")}</h1>
      </a>
      <nav className="nav">
        <Link route="articles">
          <a className="nav-item">{i18n.t("app.header.articles")}</a>
        </Link>
        <Link route="replies">
          <a className="nav-item">{i18n.t("app.header.replies")}</a>
        </Link>
        <a
          href={EDITOR_FACEBOOK_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item hidden-xs"
        >
          FB {i18n.t("app.header.editorHelp")}
        </a>
        <a
          href={PROJECT_HACKFOLDR}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-item hidden-xs"
        >
          {i18n.t("app.header.projectIntroduction")}
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
          align-items: center;
          padding: 0 24px;
        }
        .logo {
          margin-right: 16px;
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
            padding: 0 40px;
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
    onLoginClick() {
      dispatch(showDialog());
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
