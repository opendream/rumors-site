/* eslint-disable react/display-name */
// https://github.com/yannickcr/eslint-plugin-react/issues/1200

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Head from 'next/head';
import { List } from 'immutable';
import { RadioGroup, Radio } from 'react-radio-group';
import { load } from 'ducks/userList';

import AppLayout from 'components/AppLayout';
import ListPage from 'components/ListPage';
import Pagination from 'components/Pagination';

import i18n from '../i18n';

import { mainStyle } from './articles.styles';

class UserList extends ListPage {
  static async getInitialProps({ store, query, isServer }) {
    // Load on server-side render only when query.mine is not set.
    // This makes sure that reply list can be crawled by search engines too, and it can load fast
    if (isServer) return { query };
    await store.dispatch(load(query));
    return { query };
  }

  componentDidMount() {
    const { query, dispatch } = this.props;

    // Pick up initial data loading when server-side render skips
    // if (!query.mine) return;
    return dispatch(load(query));
  }

  renderSearch = () => {

    console.log('this.props', this.props)
    const {
      query: { q },
    } = this.props;
    return (
      <label>
        {i18n.t('searchFor')}:
        <input
          type="search"
          onBlur={this.handleKeywordChange}
          onKeyUp={this.handleKeywordKeyup}
          defaultValue={q}
        />
      </label>
    );
  };

  renderOrderBy = () => {
    const {
      query: { orderBy, q },
    } = this.props;
    if (q) {
      return <span> Relevance</span>;
    }

    return (
      <select
        onChange={this.handleOrderByChange}
        value={orderBy || 'createdAt_DESC'}
      >
        <option value="createdAt_DESC">{i18n.t('newestFirst')}</option>
        <option value="createdAt_ASC">{i18n.t('oldestFirst')}</option>
      </select>
    );
  };

  renderPagination = () => {
    const {
      query = {}, // URL params
      firstCursor,
      lastCursor,
      firstCursorOfPage,
      lastCursorOfPage,
    } = this.props;

    return (
      <Pagination
        query={query}
        firstCursor={firstCursor}
        lastCursor={lastCursor}
        firstCursorOfPage={firstCursorOfPage}
        lastCursorOfPage={lastCursorOfPage}
      />
    );
  };

  renderList = () => {
    const {
      users = null,
      totalCount,
    } = this.props;
    return (
      <div>
        <p>{totalCount} {i18n.t('users')}</p>
        {this.renderPagination()}
        <table className="user-list table table-bordered">
          <thead>
            <tr>
              <th scope="col">{i18n.t('name')}</th>
              <th scope="col">{i18n.t('email')}</th>
              <th scope="col">{i18n.t('createdAt')}</th>
              <th scope="col">{i18n.t('belongTo')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.get('id')}>
                <td>
                  {user.get('name')}
                </td>
                <td>
                  {user.get('email')}
                </td>
                <td>
                  {moment(user.get('createdAt')).fromNow()}
                </td>
                <td>
                  -
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.renderPagination()}
        <style jsx>{`
          .user-list {
            padding: 0;
          }
        `}</style>
      </div>
    );
  };

  render() {
    const { isLoading = false } = this.props;

    return (
      <AppLayout>
        <main>
          <Head>
            <title>{i18n.t("pageUsers.userList")}</title>
          </Head>
          <h2>{i18n.t("pageUsers.userList")}</h2>
          {/* {this.renderSearch()} */}
          <br />
          {i18n.t('orderBy')}:
          {this.renderOrderBy()}
          {isLoading ? <p>Loading...</p> : this.renderList()}
          <style jsx>{mainStyle}</style>
        </main>
      </AppLayout>
    );
  }
}

function mapStateToProps({ userList, auth }) {
  return {
    isLoggedIn: !!auth.get('user'),
    isLoading: userList.getIn(['state', 'isLoading']),
    users: (userList.get('edges') || List()).map(edge => edge.get('node')),
    totalCount: userList.get('totalCount'),
    firstCursor: userList.get('firstCursor'),
    lastCursor: userList.get('lastCursor'),
    firstCursorOfPage: userList.getIn(['edges', 0, 'cursor']),
    lastCursorOfPage: userList.getIn(['edges', -1, 'cursor']),
  };
}

export default connect(mapStateToProps)(UserList);
