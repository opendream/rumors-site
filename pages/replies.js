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
      <div className="search-form">
        <div className="row no-gutters justify-content-center">
          <div className="pr-2 pr-md-3 col-8 col-md-9">
            <input
              type="search"
              onBlur={this.handleKeywordChange}
              onKeyUp={this.handleKeywordKeyup}
              className="form-control text-field"
              defaultValue={q}
            />
          </div>
          <div className="col-4 col-md-3">
            <button className="btn btn-primary w-100" type="submit">ค้นหา</button>
          </div>
        </div>
        <style jsx>
          {`
            .search-form {
              flex: 0 0 70%;
            }
            .search-form .form-inline .form-control,
            .search-form .text-field {
              padding: 9px 15px;
              font-size: 16px;
              height: auto;
              font-weight: 300;
              border-radius: 10px;
              border-color: #fff;
              box-shadow: 0 12px 25px 0 rgba(0, 0, 0, 0.15);
            }
            .search-form .text-field::placeholder {
              font-style: italic;
              font-size: 90%;
            }
            @media screen and (min-width: 768px) {
              .search-form .text-field {
                font-size: 20px;
              }
            }
            .search-form .form-inline .form-control {
              width: 79%;
              margin-right: 1%;
            }
            .search-form .btn {
              padding: 9px 15px;
            }
            .search-form .form-inline .btn {
              width: 20%;
              padding: 9px 15px;
            }
            .search-form .btn-primary {
              background-color: #f0b4d0;
              border-color: #f0b4d0;
              font-size: 16px;
              font-weight: 500;
              color: #000;
              border-radius: 10px;
              box-shadow: 0 12px 25px 0 rgba(0, 0, 0, 0.15);
            }
            @media screen and (min-width: 768px) {
              .search-form .btn-primary {
                font-size: 20px;
              }
            }
            .search-form .btn-primary:hover,
            .search-form .btn-primary:active,
            .search-form .btn-primary:focus {
              background-color: #ff79ac !important;
              border-color: #ff79ac !important;
              color: #000;
            }
          `}
        </style>
      </div>
      
    );
  };

  renderOrderBy = () => {
    const {
      query: { orderBy, q },
    } = this.props;
    if (q) {
      return <span className="text-md-right"> {i18n.t('pageArticles.relevance')}</span>;
    }

    return (
        <div className="input-group">
          <div className="caret"></div>
          <select
            onChange={this.handleOrderByChange}
            className="form-control custom-select"
            value={orderBy || 'createdAt_DESC'}
          >
            <option value="createdAt_DESC">เขียนล่าสุด</option>
            <option value="createdAt_ASC">เขียนเมื่อนานมาแล้ว</option>
          </select>
          <style jsx>
            {`
            .input-group {
              max-width: 100%;
            }
            `}
          </style>
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
            <span className="btn btn-outline-dark">ทั้งหมด</span>
          </label>
          {['NOT_RUMOR', 'RUMOR_NOT_RUMOR', 'RUMOR', 'NOT_ARTICLE', 'OPINIONATED'].map(type => (
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
        <p className="text-muted mt-3">{totalCount} ความเห็น</p>
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
          <h2 className="mb-3">{i18n.t("pageReplies.replyList")}</h2>
          
          <div className="d-md-flex justify-content-md-between mb-2 mb-lg-3">
            {this.renderSearch()}
            <div className="form-inline mt-3 mt-md-0">
              <div className="form-group w-100">
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
