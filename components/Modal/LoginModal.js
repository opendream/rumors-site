import React from 'react';
import { connect } from 'react-redux';
import getConfig from 'next/config';
import Modal from './';
import { hideDialog, showDialog } from 'ducks/auth';
import i18n from 'i18n';

const {
  publicRuntimeConfig: { PUBLIC_API_URL },
} = getConfig();

function LoginModal({ isDialogShown, onModalClose, onModalSwitch }) {
  if (!isDialogShown) return null;

  const redirectUrl = location.href.replace(
    new RegExp(`^${location.origin}`),
    ''
  );
  const nextUrl = location.href;
  const title = isDialogShown
    ? isDialogShown
    : `${i18n.t('login')} / ${i18n.t('signup')}`;
  const action = isDialogShown == i18n.t('login') ? 'login' : 'signup';

  const onSubmit = e => {
    if (location.origin != PUBLIC_API_URL) {
      return;
    }

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const dest = `${PUBLIC_API_URL}/login/local?action=${action}&redirect=/&next=${nextUrl}`;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState, this.status, this.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // console.log('this.responseText', this.responseText)
        location.reload();
      } else if (this.readyState == 4 && this.status == 401) {
        alert('อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง');
      }
    };

    xhttp.open('POST', dest, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`email=${email}&password=${password}`);
  };

  const onSwitchClick = e => {
    onModalClose();
    action === 'login'
      ? onModalSwitch(i18n.t('signup'))
      : onModalSwitch(i18n.t('login'));
  };

  return (
    <Modal onClose={onModalClose}>
      <div className="root">
        <h4 className={`mb-4`}>{title}</h4>
        <div>
          <a onClick={onSwitchClick}>To Signup </a>
        </div>

        <div>
          <form
            action={`${PUBLIC_API_URL}/login/local?action=${action}&redirect=/&next=${nextUrl}`}
            method="post"
            onSubmit={onSubmit}
          >
            <div className="form-group">
              <input
                name="email"
                type="email"
                className={`form-control`}
                placeholder={i18n.t(`email`)}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                type="password"
                className={`form-control`}
                placeholder={i18n.t(`password`)}
                autoComplete="false"
              />
            </div>

            <input type="hidden" name="next" value={nextUrl} />
            <input type="hidden" name="redirect" value={`/`} />
            <input type="hidden" name="action" value={action} />

            <button type="submit" className="btn btn-secondary btn-block">
              {title}
            </button>
          </form>
        </div>

        <div className={`text-center mt-2 mb-3`}>
          <small className={`text-secondary`}>
            {i18n.t(`or Connect with Social Media`)}
          </small>
        </div>

        <div>
          <a
            className={`btn btn-outline-secondary btn-block`}
            href={`${PUBLIC_API_URL}/login/facebook?redirect=${redirectUrl}`}
          >
            {i18n.t(`Connect with Facebook`)}
          </a>
          {/* <a className={`btn btn-outline-secondary btn-block`} href={`${PUBLIC_API_URL}/login/twitter?redirect=${redirectUrl}`}>
            Twitter
          </a>
          <a className={`btn btn-outline-secondary btn-block`} href={`${PUBLIC_API_URL}/login/github?redirect=${redirectUrl}`}>
            Github
          </a> */}
        </div>
      </div>
      <style jsx>{`
        .root {
          padding: 20px;
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
    onModalSwitch(switchTitle) {
      dispatch(showDialog(switchTitle));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginModal);
