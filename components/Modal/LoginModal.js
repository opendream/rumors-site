import React from 'react';
import { connect } from 'react-redux';
import getConfig from 'next/config';
import Modal from './';
import { hideDialog } from 'ducks/auth';
import i18n from 'i18n';

const {
  publicRuntimeConfig: { PUBLIC_API_URL },
} = getConfig();

function LoginModal({ isDialogShown, onModalClose }) {
  if (!isDialogShown) return null;

  const redirectUrl = location.href.replace(
    new RegExp(`^${location.origin}`),
    ''
  );
  const title = isDialogShown;
  console.log('title', title)

  return (
    <Modal onClose={onModalClose}>
      <div className="root">
        <h1>{title? title: `${i18n.t('login')} / ${i18n.t('signup')}`}</h1>
        <a href={`${PUBLIC_API_URL}/login/facebook?redirect=${redirectUrl}`}>
          Facebook
        </a>・
        <a href={`${PUBLIC_API_URL}/login/twitter?redirect=${redirectUrl}`}>
          Twitter
        </a>・
        <a href={`${PUBLIC_API_URL}/login/github?redirect=${redirectUrl}`}>
          Github
        </a>
      </div>
      <style jsx>{`
        .root {
          padding: 40px;
        }
      `}</style>
    </Modal>
  );
}

function mapStateToProps({ auth }) {
  return {
    isDialogShown: auth.getIn(['state', 'isDialogShown']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onModalClose() {
      dispatch(hideDialog());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
