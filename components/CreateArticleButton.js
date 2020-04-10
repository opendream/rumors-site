import React from 'react';
import Link from 'next/link';
import i18n from 'i18n';
import { showDialog } from 'ducks/auth';

export default class CreateArticleButton extends React.Component {

  onLoginClick = title => {
    const { dispatch } = this.props;
    dispatch(showDialog(title));
  };

  render() {
    const { user } = this.props;
    if (user != null) {
      return (
        <Link href={`/create`}>
          <a className={`btn btn-secondary btn-create d-inline-flex align-items-center`}>{i18n.t('createArticle')}</a>
        </Link>
      );
    } else {
      return (
        <a className={`btn btn-secondary btn-sm`} onClick={e => {
          e.preventDefault();
          this.onLoginClick(i18n.t('signup'));
        }}>
          {i18n.t('createArticle')}
        </a>
      );
    }
  }
}
