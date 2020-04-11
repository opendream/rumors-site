/* eslint-disable react/display-name */
// https://github.com/yannickcr/eslint-plugin-react/issues/1200

import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { List } from 'immutable';
import { RadioGroup, Radio } from 'react-radio-group';
import { load } from 'ducks/replyList';

import { TYPE_NAME, TYPE_DESC } from '../constants/replyType';

import AppLayout from 'components/AppLayout';
import ListPage from 'components/ListPage';
import Pagination from 'components/Pagination';
import ReplyItem from 'components/ReplyItem';

import i18n from '../i18n';

import { mainStyle } from './articles.styles';

class ReplyList extends ListPage {
  static async getInitialProps({ store, query, isServer }) {
    // Load on server-side render only when query.mine is not set.
    // This makes sure that reply list can be crawled by search engines too, and it can load fast
    if (query.mine && isServer) return;
    await store.dispatch(load(query));
    return { query };
  }

  componentDidMount() {
    const { query, dispatch } = this.props;

    // Pick up initial data loading when server-side render skips
    if (!query.mine) return;
    return dispatch(load(query));
  }

  handleMyReplyOnlyCheck = e => {
    this.goToQuery({
      mine: e.target.checked ? 1 : undefined,
    });
  };

  renderSearch = () => {
    const {
      query: { q },
    } = this.props;
    return (
      <div className="form-inline">
        <div className="form-group">
          <label className="mr-2"> Search For:
          </label>
          <input
            type="search"
            onBlur={this.handleKeywordChange}
            onKeyUp={this.handleKeywordKeyup}
            className="form-control"
            defaultValue={q}
          />
        </div>
      </div>
      
    );
  };

  renderOrderBy = () => {
    const {
      query: { orderBy, q },
    } = this.props;
    if (q) {
      return <span className="text-md-right"> Relevance</span>;
    }

    return (
        <div className="input-group">
          <div className="caret"></div>
          <select
            onChange={this.handleOrderByChange}
            className="form-control custom-select"
            value={orderBy || 'createdAt_DESC'}
          >
            <option value="createdAt_DESC">Most recently written</option>
            <option value="createdAt_ASC">Least recently written</option>
          </select>
        </div>
          

    );
  };

  renderMyReplyOnlyCheckbox() {
    const {
      isLoggedIn,
      query: { mine },
    } = this.props;
    if (!isLoggedIn) return null;

    return (
      <div>
        <input
          type="checkbox"
          onChange={this.handleMyReplyOnlyCheck}
          checked={!!mine}
          id="onlyMine"
        />
        <label for="onlyMine">  
          {i18n.t("pageReplies.onlyMine")}
        </label>
      </div>
      
    );
  }

  renderFilter = () => {
    const {
      query: { filter },
    } = this.props;
    return (
        <RadioGroup
          onChange={this.handleFilterChange}
          selectedValue={filter || 'all'}
          Component="div"
          className="btn-group-link btn-group-toggle"
        >
          <label className="link">
            <Radio value="all" />
            <span className="btn btn-outline-dark">All</span>
          </label>
          {['NOT_ARTICLE', 'OPINIONATED', 'NOT_RUMOR', 'RUMOR'].map(type => (
            <label className="link" key={type}>
              <Radio id={type} value={type} title={TYPE_DESC[type]} />
              <span className="btn btn-outline-dark">{TYPE_NAME[type]}</span>
            </label>
          ))}

        </RadioGroup>
      
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
      replies = null,
      totalCount,
      query: { mine },
    } = this.props;
    return (
      <div>
        <p className="text-muted mt-3">{totalCount} replies</p>
        {this.renderPagination()}
        <div className="reply-list">
          {replies.map(reply => (
            <ReplyItem key={reply.get('id')} reply={reply} showUser={!mine} />
          ))}
        </div>
        {this.renderPagination()}
        <style jsx>{`
          .reply-list {
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
        <main className="wrapper-main">
          <Head>
            <title>{i18n.t("pageReplies.replyList")}</title>
          </Head>
          <h2 className="mb-2 mb-lg-3">{i18n.t("pageReplies.replyList")}</h2>
          
          <div className="d-md-flex justify-content-md-between">
            {this.renderSearch()}
            <div className="form-inline">
              <div className="form-group">
                {/* <label className="mr-2">Order By:</label> */}
                {this.renderOrderBy()}
              </div>
            </div>
          </div>
          <br />
          <div className="">
            {this.renderFilter()}
            {this.renderMyReplyOnlyCheckbox()}
          </div>
          
          {isLoading ? <p>Loading...</p> : this.renderList()}
          <style jsx>{mainStyle}</style>
        </main>
      </AppLayout>
    );
  }
}

function mapStateToProps({ replyList, auth }) {
  return {
    isLoggedIn: !!auth.get('user'),
    isLoading: replyList.getIn(['state', 'isLoading']),
    replies: (replyList.get('edges') || List()).map(edge => edge.get('node')),
    totalCount: replyList.get('totalCount'),
    firstCursor: replyList.get('firstCursor'),
    lastCursor: replyList.get('lastCursor'),
    firstCursorOfPage: replyList.getIn(['edges', 0, 'cursor']),
    lastCursorOfPage: replyList.getIn(['edges', -1, 'cursor']),
  };
}

export default connect(mapStateToProps)(ReplyList);
