/* eslint-disable react/display-name */
// https://github.com/yannickcr/eslint-plugin-react/issues/1200

import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { List } from 'immutable';
import { Link } from '../routes';
import { CheckboxGroup, Checkbox } from 'react-checkbox-group';

import AppLayout from 'components/AppLayout';
import ListPage from 'components/ListPage';
import Pagination from 'components/Pagination';
import ArticleItem from 'components/ArticleItem';
import FullSiteArticleStats from 'components/FullSiteArticleStats';
import articleList, { load, loadAuthFields } from 'ducks/articleList';
import tagList, { load as loadTags } from 'ducks/tagList';

import CreateArticleButton from '../components/CreateArticleButton';
import i18n from '../i18n';

import { mainStyle, hintStyle } from './articles.styles';
import { TYPE_ARTICLE_OPTIONS } from 'constants/articleCategory';

class Articles extends ListPage {
  state = {
    localEditorHelperList: {
      demoId: {
        // ID of articles state which already read or replied
        read: true,
        notArticleReplied: false, // false ||
      },
      groupName: null,
    },
    user: null,
  };

  static async getInitialProps({ store, query }) {
    if (typeof query.replyRequestCount === 'undefined') {
      query.replyRequestCount = 1;
    }
    await store.dispatch(load(query));
    await store.dispatch(loadTags({}));
    return { query };
  }

  componentDidMount() {
    // Browser-only
    this.props.dispatch(loadAuthFields(this.props.query));
    this.initLocalEditorHelperList();
  }

  initLocalEditorHelperList = () => {
    if (localStorage) {
      const localEditorHelperList = JSON.parse(
        localStorage.getItem('localEditorHelperList')
      );
      localEditorHelperList &&
        this.setState({
          localEditorHelperList,
        });
    }
  };

  handleLocalEditorHelperList = ({ id, read, notArticleReplied }) => {
    this.setState(
      ({ localEditorHelperList }) => ({
        localEditorHelperList: {
          ...localEditorHelperList,
          [id]: {
            read,
            notArticleReplied,
          },
        },
      }),
      () => {
        localStorage.setItem(
          'localEditorHelperList',
          JSON.stringify(this.state.localEditorHelperList)
        );
      }
    );
  };

  handleReplyRequestCountCheck = e => {
    // Sets / clears reply request as checkbox is changed
    if (e.target.checked) {
      this.goToQuery({
        replyRequestCount: 1,
      });
    } else {
      this.goToQuery({
        replyRequestCount: 2,
      });
    }
  };

  renderSearch = () => {
    const {
      query: { q },
    } = this.props;
    return (
      <div className={``}>
        <div className="row justify-content-md-center mt-2 mb-2 mt-xl-4">
          <div className={`col`}>
            <div className="search-form">
              <div className="row no-gutters justify-content-center">
                <div className="col-12 col-lg-8">
                  <input
                    className="form-control text-field"
                    placeholder="พิมพ์ข้อความที่ต้องการตรวจสอบ?"
                    type="search"
                    onBlur={this.handleKeywordChange}
                    onKeyUp={this.handleKeywordKeyup}
                    defaultValue={q}
                  />
                  <button type="submit" className="btn btn-search">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2C6.30558 2 2.5 5.80558 2.5 10.5C2.5 15.1944 6.30558 19 11 19C12.9864 19 14.8149 18.3176 16.2617 17.176L21.0858 22C21.4764 22.3905 22.1095 22.3905 22.5001 22C22.8906 21.6095 22.8906 20.9763 22.5001 20.5858L17.676 15.7618C18.8176 14.3149 19.5001 12.4865 19.5001 10.5C19.5001 5.80558 15.6944 2 11 2ZM4.5 10.5C4.5 6.91015 7.41015 4 11 4C14.5898 4 17.5001 6.91015 17.5001 10.5C17.5001 12.2952 16.7735 13.9188 15.5961 15.0962C14.4188 16.2736 12.7952 17 11 17C7.41015 17 4.5 14.0899 4.5 10.5Z" fill="black"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <style jsx>
          {`
            .search-form .form-inline .form-control,
            .search-form .text-field {
              border-radius: var(--rounded-full, 9999px);
              border: 1px solid #9BA5B7;
              padding: 12px 50px 12px 20px;
              background: #FFF;
              position: relative;
              font-size: 1.25rem;
            }
            .search-form .text-field::placeholder {
              font-size: 80%;
            }
            @media screen and (min-width: 768px) {
              .search-form .text-field {
                font-size: 20px;
              }
            }
            .search-form .btn {
              position: absolute;
              right: 3px;
              top: 50%;
              transform: translate(0%, -50%);
              border-radius: 50%;
              width: 40px;
              height: 40px;
              padding: 0;
            }
            .search-form .form-inline .btn {
              width: 20%;
              padding: 15px;
            }
            @media screen and (min-width: 768px) {
              .search-form .btn-primary {
                font-size: 20px;
              }
            }
          `}
        </style>
      </div>
    );
  };

  renderHeader = () => {
    const { stats, repliedArticleCount } = this.props;

    return (
      <h2 className="header justify-content-center justify-content-md-end mb-0">
        {/* <span>{i18n.t('articleList')}</span> */}
        <FullSiteArticleStats
          stats={stats}
          repliedArticleCount={repliedArticleCount}
        />
        <style jsx>{`
          .header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: stretch;
            // padding-bottom: 1rem;
            // border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          }
          @media screen and (min-width: 576px) {
            .header {
              flex-direction: row;
              align-items: flex-end;
            }
          }
        `}</style>
      </h2>
    );
  };

  renderSearchedArticleHeader = () => {
    const {
      query: { searchUserByArticleId },
      articles,
    } = this.props;
    const searchedArticle = articles.find(
      article => article.get('id') === searchUserByArticleId
    );
    return (
      <h2>
        {i18n.t('with')}{' '}
        <mark>
          {searchedArticle
            ? searchedArticle.get('text')
            : `Article ID: ${searchUserByArticleId}`}
        </mark>{' '}
        {i18n.t('pageArticles.listArticlesSameReturnee')}
        <style jsx>{`
          mark {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 14em;
            display: inline-block;
            vertical-align: bottom;
            padding: 0 0.3em;
          }
        `}</style>
      </h2>
    );
  };

  renderOrderBy = () => {
    const {
      query: { orderBy, q },
    } = this.props;
    if (q) {
      return <span> {i18n.t('pageArticles.relevance')}</span>;
    }

    return (
      <div className="text-md-right float-md-right">
        <div className="dropdown-cat">
          <div className="caret"></div>
          <select
            onChange={this.handleOrderByChange}
            value={orderBy || 'createdAt'}
            className="cat-toggle"
          >
            <option value="createdAt">{i18n.t('mostRecentlyAsked')}</option>
            <option value="replyRequestCount">{i18n.t('mostAsked')}</option>
          </select>
        </div>
        <style jsx>
          {`
          .dropdown-cat {
            position: relative;
          }
          .dropdown-cat .cat-toggle {
            -webkit-appearance: none;    
            -moz-appearance: none;
            padding: 5px 30px 5px 10px;
            font-size: 1rem;
            text-align: left;;
            border-radius: 50px;
            border: 1px solid #9BA5B7;
            background: #FFF;
            color: #545F71;
          }
          .dropdown-cat .caret {
            position: absolute !important;
            top: 50%;
            right: 5px;
            transform: translateY(-50%);
            z-index: 1;
            vertical-align: middle;
            content: "";
            background: url("/static/img/icon/caret-down.svg") no-repeat center center;
            background-size: 10px;
            position: relative;
            width: 15px;
            height: 15px;
          }
          `}
        </style>
      </div>
    );
  };

  handleGroupName = (groupName) => {
    console.log(groupName)
    this.setState(prevState => ({
      groupName: (prevState.groupName !== groupName)? groupName: null
    }));
  };

  renderFilter = () => {
    const {
      query: { categories: _categories, filter, replyRequestCount },
      tags
    } = this.props;

    const { groupName } = this.state;

    let categories = _categories ? _categories.split(',') : [];

    let groupTags = []
    let groupTagsKeys = {"อื่นๆ": []}
    tags.forEach(function(tag, i) {
      let groupName = "อื่นๆ"
      if (tag.get('groupName')) {
        groupName = tag.get('groupName')

        try {
          groupTagsKeys[groupName].push(tag)
        } catch (e) {
          groupTagsKeys[groupName] = [tag]
          groupTags.push(groupName)
        }
        return
      }
      groupTagsKeys["อื่นๆ"].push(tag)

    })
    groupTags = groupTags.sort()
    groupTags.push("อื่นๆ")


    return (
      <div>
        <div className="row no-gutters justify-content-center">
          <div className={`col-12 col-lg-8`}>
            <div className={`wrapper-cat mb-2`}>
              <div className={``}>
                {/* <h5>{i18n.t('categories')}</h5> */}

                <CheckboxGroup
                  checkboxDepth={6}
                  name="categories"
                  value={categories}
                  onChange={this.handleCategoriesChange}
                  Component="div"
                  className="d-flex align-items-center"
                >
                  <div className="flex-grow-1 d-flex flex-row flex-wrap row no-gutters">
                  {groupTags.map((group, ii) => (
                    <div className="col-6 col-sm-3 item-list">
                      <div className="btn-group w-full p-1">
                        <a className="btn btn-outilne dropdown-toggle" role="button" id={'dropdownMenu_'+ ii}
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => this.handleGroupName(group)}>
                          {group}
                        </a>
                        <div className={'dropdown-menu w-full p-2 '+ ((groupName === group)?'show': 'hidden')} aria-labelledby={'dropdownMenu_'+ ii}>
                        {groupTagsKeys[group].map((item, i) => (
                          <div
                            key={i}
                            className="dropdown-item form-check form-check-inline p-0 m-0"
                          >
                            <Checkbox value={item.get('title')} id={"category_" + item.get('title')} />
                            <label className="p-2 mb-0 w-full" htmlFor={"category_" + item.get('title')}>
                              {item.get('title')}
                            </label>
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>)
                  )}
                  </div>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          <div className={`col-12 col-lg-8`}>
            <div className={``}>
              <div className={``}>
                {/* <h5>{i18n.t('categories')}</h5> */}
                <div className="d-flex mb-4 flex-wrap">
                  {
                    categories.map((item, i) => (
                      <span key={i}
                            className="badge-category badge mr-2 mb-2"
                      >
                        <label className="mx-1 pr-1 color-white " htmlFor={"category_" + item}>
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.46967 8.46967C0.176777 8.76256 0.176777 9.23744 0.46967 9.53033C0.762563 9.82322 1.23744 9.82322 1.53033 9.53033L0.46967 8.46967ZM5.53033 5.53033C5.82322 5.23744 5.82322 4.76256 5.53033 4.46967C5.23744 4.17678 4.76256 4.17678 4.46967 4.46967L5.53033 5.53033ZM4.46967 4.46967C4.17678 4.76256 4.17678 5.23744 4.46967 5.53033C4.76256 5.82322 5.23744 5.82322 5.53033 5.53033L4.46967 4.46967ZM9.53033 1.53033C9.82322 1.23744 9.82322 0.762563 9.53033 0.46967C9.23744 0.176777 8.76256 0.176777 8.46967 0.46967L9.53033 1.53033ZM5.53033 4.46967C5.23744 4.17678 4.76256 4.17678 4.46967 4.46967C4.17678 4.76256 4.17678 5.23744 4.46967 5.53033L5.53033 4.46967ZM8.46967 9.53033C8.76256 9.82322 9.23744 9.82322 9.53033 9.53033C9.82322 9.23744 9.82322 8.76256 9.53033 8.46967L8.46967 9.53033ZM4.46967 5.53033C4.76256 5.82322 5.23744 5.82322 5.53033 5.53033C5.82322 5.23744 5.82322 4.76256 5.53033 4.46967L4.46967 5.53033ZM1.53033 0.46967C1.23744 0.176777 0.762563 0.176777 0.46967 0.46967C0.176777 0.762563 0.176777 1.23744 0.46967 1.53033L1.53033 0.46967ZM1.53033 9.53033L5.53033 5.53033L4.46967 4.46967L0.46967 8.46967L1.53033 9.53033ZM5.53033 5.53033L9.53033 1.53033L8.46967 0.46967L4.46967 4.46967L5.53033 5.53033ZM4.46967 5.53033L8.46967 9.53033L9.53033 8.46967L5.53033 4.46967L4.46967 5.53033ZM5.53033 4.46967L1.53033 0.46967L0.46967 1.53033L4.46967 5.53033L5.53033 4.46967Z" fill="black"/>
                          </svg>
                        </label>
                        {item}
                        
                      </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style jsx>
          {`
              // .wrapper-cat {
              //   border-top: 1px solid #DFDFDF;
              //   border-bottom: 1px solid #DFDFDF;
              // }
              .wrapper-cat {
                z-index: 1;
              }
              .wrapper-cat .dropdown-toggle {
                font-size: 1rem;
                text-align: left;
                position: relative;
                border-radius: 999999px;
                border: 1px solid #9BA5B7;
                background: #FFF;
                color: #545F71;
              }
              .wrapper-cat .dropdown-toggle::after {
                display: none;
              }
              .wrapper-cat .dropdown-toggle::before {
                position: absolute !important;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                z-index: 1;
                margin-left: 0.5em;
                margin-right: 0.5em;
                vertical-align: middle;
                content: "";
                background: url("/static/img/icon/caret-down.svg") no-repeat 0 0;
                background-size: contain;
                position: relative;
                width: 10px;
                height: 6px;
              }
              .wrapper-cat .dropdown-menu {
                border-radius: 10px;
                box-shadow: 0px 12px 25px rgba(0, 0, 0, 0.15);
                border:none;
              }
              .wrapper-cat .dropdown-item input[type=checkbox]+label:before {
                background: url("/static/img/icon/ic-checkbok-cat.png") no-repeat 0 0 !important;
                background-size: 20px;
              }
              .wrapper-cat label {
                font-size: 1rem;
              }
              .wrapper-cat input[type=checkbox]+label:before {
                content: "";
                display: inline-block;
                width: 20px;
                height: 20px;
                margin: 0 .5em 0 0;
                background: url("/static/img/icon/ic-check-cat.png") no-repeat 0 0 !important;
                background-size: 20px;
                vertical-align: bottom;
                position: relative;
                bottom: 2px;
              }
              .wrapper-cat .dropdown-item.active, 
              .wrapper-cat .dropdown-item:active {
              background-color: #F0B4D0;}
              .badge-category {
                font-size: 0.85rem;
                font-weight: bold;
                background-color: #E3E3E3;
                border-radius: 50px;
                padding: 5px 20px 5px 10px;
              }
              .badge-category label {
                margin-bottom: 0;
              }
              
             
              @media screen and (min-width: 768px) {
                .wrapper-cat label {
                  font-size: 1rem;
                }
              }
              .badge-light {
                background-color: #aaa;
              }
              
              label {
              cursor: pointer;
              }
              .w-full {
                width: 100%;
              }
              .dropdown-toggle::after {
                //content: none;
              }
              @media screen and (max-width: 768px) {
                .md-d-none {
                  display: none;
                }
              }
            `}
          </style>
        </div>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-5">
          <div className="mb-2">
            <h3 className="header-title-link"><span>ข่าวที่ส่ง</span>มาตรวจสอบ</h3>
          </div>
          <div className="d-flex align-items-center mb-2">
            <div className="">
              <div className="">
                <div className="dropdown-cat">
                  <div className="caret"></div>
                  <select
                    onChange={e => this.handleFilterChange(e.target.value)}
                    value={filter || 'all'}
                    className="cat-toggle"
                  >
                    <option value="all">ข้อความทั้งหมด</option>
                    <option value="unsolved">{i18n.t('notRepliedYet')}</option>
                    <option value="solved">{i18n.t('replied')}</option>
                  </select>
                </div>
                <style jsx>
                  {`
                    .dropdown-cat {
                      position: relative;
                    }
                    .dropdown-cat .cat-toggle {
                      -webkit-appearance: none;
                      -moz-appearance: none;
                      padding: 5px 30px 5px 10px;
                      font-size: 1rem;
                      text-align: left;
                      border-radius: 50px;
                      border: 1px solid #9BA5B7;
                      background: #FFF;
                      color: #545F71;
                    }
                    .dropdown-cat .caret {
                      position: absolute !important;
                      top: 50%;
                      right: 5px;
                      transform: translateY(-50%);
                      z-index: 1;
                      vertical-align: middle;
                      content: "";
                      background: url("/static/img/icon/caret-down.svg") no-repeat center center;
                      background-size: 10px;
                      position: relative;
                      width: 15px;
                      height: 15px;
                    }
                  `}
                </style>
              </div>
            </div>
            <div className="ml-2">
              {this.renderOrderBy()}
            </div>
          </div>
        </div>
        {/* <div className={`row mt-3`}>
          <div className={`col-12`}>
            <input
              type="checkbox"
              id="countcheck"
              checked={
                +replyRequestCount === 1 ||
                typeof replyRequestCount === 'undefined'
              }
              onChange={this.handleReplyRequestCountCheck}
            />{' '}
            <label htmlFor="countcheck">
              {i18n.t('pageArticles.listArticlesIncludeOne')}
            </label>
          </div>
        </div> */}
        <style>
          {`
            .header-title-link span {
              position: relative;
              z-index: 1;
            }
            .header-title-link span::after {
                content: "";
                background-color: #F0B4D0;
                display: block;
                width: 100%;
                height: 10px;
                position: absolute;
                bottom: 0.5rem;
                z-index: -1;
                right: 0;
            }
            .reply-request-count {
              width: 2em;
            }
            ul {
              list-style: none;
              padding-left: 0;
              margin-bottom: 0;
            }
            ul li input {
              margin-right: 0.5rem;
            }
            .btn-group-toggle {
            }
            .btn-group-toggle input {
              display: none;
            }
            .btn-group-toggle .link { 
              display: flex;
              margin-bottom: 0;
            }
            .btn-group-toggle .btn {
              border-radius: 40px;
            }

            .btn-group-toggle .btn.btn-first {
              
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
            .btn-group-toggle .btn.btn-last {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
            }
            .btn-group-toggle .btn.btn-middle {
              border-radius: 0;
              border-left: 0;
              border-right: 0;
            }

            .btn-group-toggle input:checked ~ .btn {
              background-color: #343a40;
              color: #fff;
            }
            @media screen and (min-width: 375px) {
              .btn-group-toggle .btn {
                padding: 0.25rem 0.75rem;
                font-size: 15px;
                font-weight: 500;
              }
            }
            
        `}
        </style>
      </div>
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
    const { localEditorHelperList } = this.state;
    const {
      articles = null,
      totalCount,
      authFields,
      user,
      dispatch,
      query: { q },
    } = this.props;

    return (
      <div className={`article-wrapper`}>
        {totalCount > 0 ? (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="small font-weight-bold">
                ({totalCount} {i18n.t('pageArticles.articles')})
              </div>

            </div>
            {this.renderPagination()}
            <ul className="article-list">
              {articles.map(article => {
                const id = article.get('id');

                const replyConnections = article.get('articleReplies');
                return (
                  <ArticleItem
                    key={id}
                    article={article}
                    isLogin={authFields.size !== 0}
                    requestedForReply={authFields.get(article.get('id'))}
                    handleLocalEditorHelperList={
                      this.handleLocalEditorHelperList
                    }
                    replyConnections={replyConnections}
                    {...localEditorHelperList[id]}
                  />
                );
              })}
            </ul>
            {this.renderPagination()}
          </div>
        ) : (
          <div className="">
            {/* <h4 className={`my-4`}>{i18n.t('notFoundSearchArticleResult')}</h4> */}
          </div>
        )}

        {q ? (
          <div className="mb-3 mt-3 wrapper-search-notfound">
            <div className="image">
              <img src="/static/img/notfound-cofact.png" alt="Not Found" width={'100%'} />
            </div>
            <div className="content">
              <h3 className={`mb-2`}>{i18n.t('notFoundSearchArticleResult')}</h3>
              <p className={`mb-0 text-lg`}>{totalCount > 0
                ? i18n.t('createArticleLinkExistTeaser')
                : i18n.t('createArticleLinkTeaser')}</p>
              <br /><CreateArticleButton dispatch={dispatch} user={user} />
            </div>
            
          </div>
        ) : (
          ``
        )}
        <style jsx>
          {`
            .article-wrapper {
              // border-top: 1px solid rgba(0, 0, 0, 0.3);
              // margin-top: 1rem;
            }

            .article-list {
              list-style: none;
              display: flex;
              -ms-flex-direction: column;
              flex-direction: column;
              padding-left: 0;
              margin-bottom: 0;
            }
            .wrapper-search-notfound {
              background-color: #fff;
              padding: 50px 20px;
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
            }
            .wrapper-search-notfound .text-lg {
              font-size: 18px;
            }
            .wrapper-search-notfound .image {
              margin: 0 auto 20px;
              text-align: center;
              width: 100%;
            }
            .wrapper-search-notfound .content {
              width: 100%;
              text-align: center;
            }
            .wrapper-search-notfound .image img {
              max-width: 250px;
            }
            @media screen and (min-width: 768px) {
              .wrapper-search-notfound .image {
                margin: 0 20px 0 0;
                width: 25%;
                text-align: left;
              }
              
              .wrapper-search-notfound .content {
                width: 40%;
                text-align: left;
              }
              .wrapper-search-notfound .text-lg {
                font-size: 20px;
              }
            }
          `}
        </style>
      </div>
    );
  };

  render() {
    const {
      isLoading = false,
      query: { replyRequestCount, searchUserByArticleId },
    } = this.props;

    const { user } = this.props;

    return (
      <AppLayout>
        <main className="wrapper-main">
          <Head>
            <title>{i18n.t('pageArticles.reallyFake')}</title>
          </Head>
          {/* {searchUserByArticleId
            ? this.renderSearchedArticleHeader()
            : this.renderHeader()} */}
          {this.renderSearch()}
          {this.renderFilter()}
          {isLoading ? <p>Loading...</p> : this.renderList()}
          <span />
          {+replyRequestCount !== 1 &&
          typeof replyRequestCount !== 'undefined' ? (
            <span className="hint">
              {i18n.t('pageArticles.listArticlesMoreThanTwoPeople')}{' '}
              <Link route="articles" params={{ replyRequestCount: 1 }}>
                <a>{i18n.t('pageArticles.clickHere')}</a>
              </Link>
            </span>
          ) : null}
          <style jsx>{hintStyle}</style>
          <style jsx>{mainStyle}</style>
        </main>
      </AppLayout>
    );
  }
}

function mapStateToProps({ articleList, tagList, auth }) {
  return {
    isLoading: articleList.getIn(['state', 'isLoading']),
    articles: (articleList.get('edges') || List()).map(edge =>
      edge.get('node')
    ),
    tags: (tagList.get('edges') || List()).map(edge =>
      edge.get('node')
    ),
    stats: articleList.get('stats'),
    authFields: articleList.get('authFields'),
    totalCount: articleList.get('totalCount'),
    firstCursor: articleList.get('firstCursor'),
    lastCursor: articleList.get('lastCursor'),
    firstCursorOfPage: articleList.getIn(['edges', 0, 'cursor']),
    lastCursorOfPage: articleList.getIn(['edges', -1, 'cursor']),
    repliedArticleCount: auth.getIn(['user', 'repliedArticleCount']),
    user: auth.get('user'),
  };
}

export default connect(mapStateToProps)(Articles);
