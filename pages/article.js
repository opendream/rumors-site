import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import stringSimilarity from 'string-similarity';
import { nl2br, linkify } from '../util/text';
import { showDialog } from 'ducks/auth';

import AppLayout from 'components/AppLayout';
import ArticleInfo from 'components/ArticleInfo';
import ArticleItem from 'components/ArticleItem';
import CurrentReplies from 'components/CurrentReplies';
import RelatedReplies from 'components/RelatedReplies';
import ReplySearch from 'components/ReplySearch/ReplySearch.js';
import ReplyForm from 'components/ReplyForm';
import ReplyRequestReason from 'components/ReplyRequestReason';
import Hyperlinks from 'components/Hyperlinks';
import ArticleTruthMeter from '../components/ArticleTruthMeter/ArticleTruthMeter';
import FlaggedReplyInfomation from "../components/FlaggedReplyInfomation";
import ClaimReviewJsonifier from "../components/ClaimReviewJsonifier";
import CalcDegreeFromReply from "../components/CalcDegreeFromReply";

import {
  load,
  loadAuth,
  submitReply,
  connectReply,
  searchReplies,
  searchRepiedArticle,
  updateArticleReplyStatus,
  voteReply,
  reset,
  voteReplyRequest,
  submitArticleCategories,
  fetchArticleHyperlink,
  fetchReplyHyperlink,
  categoriesEdit,
} from 'ducks/articleDetail';
import i18n from '../i18n';

import { detailStyle, tabMenuStyle } from './article.styles';
import { TYPE_ARTICLE_OPTIONS } from 'constants/articleCategory';
import Routes from 'next-routes';
import { Link } from '../routes';

class ArticlePage extends React.Component {
  state = {
    tab: 'new', // 'new, 'related', 'search'
    isExpanded: false,
  };

  static async getInitialProps({ store: { dispatch }, query: { id } }) {
    await dispatch(load(id));
    return { id };
  }

  componentDidMount() {
    const { id, dispatch } = this.props;
    return dispatch(loadAuth(id));
  }

  handleConnect = ({ target: { value: replyId } }) => {
    const { dispatch, id } = this.props;
    return dispatch(connectReply(id, replyId)).then(this.scrollToReplySection);
  };

  handleSearchReply = ({ target: { value: queryString } }, after) => {
    const { dispatch } = this.props;
    dispatch(
      searchReplies({
        q: queryString,
        after,
      })
    );
    dispatch(
      searchRepiedArticle({
        q: queryString,
      })
    );
  };

  handleSubmit = reply => {
    const { dispatch, id } = this.props;
    return dispatch(
      submitReply({
        ...reply,
        articleId: id,
      })
    ).then(this.scrollToReplySection);
  };

  handleReplyConnectionDelete = conn => {
    const { dispatch, id } = this.props;
    return dispatch(
      updateArticleReplyStatus(id, conn.get('replyId'), 'DELETED')
    );
  };

  handleReplyConnectionRestore = conn => {
    const { dispatch, id } = this.props;
    return dispatch(
      updateArticleReplyStatus(id, conn.get('replyId'), 'NORMAL')
    ).then(this.scrollToReplySection);
  };

  handleVoteReplyRequest = (replyRequestId, voteType, indexOfReplyRequests) => {
    const { dispatch, id } = this.props;
    dispatch(
      voteReplyRequest(id, replyRequestId, voteType, indexOfReplyRequests)
    );
  };

  handleReplyConnectionVote = (conn, vote, comment) => {
    const { dispatch, id } = this.props;
    return dispatch(voteReply(id, conn.get('replyId'), vote, comment));
  };

  handleTabChange = tab => () => {
    this.setState({
      tab,
    });
  };

  handleCategoriesEdit = (isEdit = true) => {
    const { dispatch, id } = this.props;
    return dispatch(categoriesEdit(isEdit));
  };

  handleCategoriesSubmit = categories => {
    const { dispatch, id } = this.props;
    return dispatch(
      submitArticleCategories({
        categories,
        articleId: id,
      })
    );
  };

  handleFetchHyperlink = hyperlink => {
    const { dispatch, id } = this.props;
    return dispatch(
      fetchArticleHyperlink({
        hyperlink,
        articleId: id,
      })
    );
  };

  handleFetchReplyHyperlink = (replyId, hyperlink) => {
    const { dispatch, id } = this.props;
    return dispatch(
      fetchReplyHyperlink({
        hyperlink,
        replyId,
        articleId: id,
      })
    );
  };

  scrollToReplySection = () => {
    if (!this._replySectionEl) return;
    this._replySectionEl.scrollIntoView({
      behavior: 'smooth',
    });
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(reset());
  }

  renderTabMenu = () => {
    const { data } = this.props;
    const { tab } = this.state;
    const relatedReplyCount = data.get('relatedReplies').size;

    return (
      <ul className="tabs">
        <li
          onClick={this.handleTabChange('new')}
          className={`tab ${tab === 'new' ? 'active' : ''}`}
        >
          {i18n.t('pageArticle.tabMenu1')}
        </li>
        <li
          onClick={this.handleTabChange('related')}
          className={`tab ${tab === 'related' ? 'active' : ''} ${
            relatedReplyCount === 0 ? 'disabled' : ''
          }`}
        >
          {relatedReplyCount === 0 ? (
            `${i18n.t('pageArticle.tabMenu2')}`
          ) : (
            <span>
              {i18n.t('sentence.useRelavantReplies')}{' '}
              <span className="badge badge-primary">{relatedReplyCount}</span>
            </span>
          )}
        </li>
        <li
          onClick={this.handleTabChange('search')}
          className={`tab search ${tab === 'search' ? 'active' : ''}`}
        >
          {i18n.t('search')}
        </li>
        <li className="empty" />
        <style jsx>{tabMenuStyle}</style>
      </ul>
    );
  };

  renderNewReplyTab = () => {
    const { data, isReplyLoading } = this.props;
    const { tab } = this.state;

    const article = data.get('article');
    const relatedReplies = data.get('relatedReplies');
    const searchArticles = data.get('searchArticles');
    const searchReplies = data.get('searchReplies');

    const articleText = article.get('text', '');
    const getArticleSimilarity = relatedArticleText =>
      stringSimilarity.compareTwoStrings(articleText, relatedArticleText);

    switch (tab) {
      case 'new':
        return (
          <ReplyForm onSubmit={this.handleSubmit} disabled={isReplyLoading} />
        );

      case 'related':
        return (
          <RelatedReplies
            onConnect={this.handleConnect}
            relatedReplies={relatedReplies}
            getArticleSimilarity={getArticleSimilarity}
          />
        );

      case 'search':
        return (
          <ReplySearch
            onConnect={this.handleConnect}
            onSearch={this.handleSearchReply}
            articles={searchArticles}
            replies={searchReplies}
          />
        );

      default:
        return null;
    }
  };

  renderEditButton = (replyConnections, user, articleDetail) => {
    // console.log (": articleDetail : "+ articleDetail);
    const articleId = articleDetail.get('id');
    let isEditable = false;
    let isZeroReply = true;
    let isCreatorViewing = false;
    let articleCreatorId = articleDetail.getIn(['user', 'id']) || 0;

    if (user != null) {
      let loggedInUserId = user.get('id');
      if (articleCreatorId === loggedInUserId) isCreatorViewing = true;
    }

    if (replyConnections.size > 0) {
      isZeroReply = false;
    }

    if (isCreatorViewing && isZeroReply) {
      isEditable = true;
    }
    // console.log(isEditable+" : "+isZeroReply+" : "+isCreatorViewing);

    isEditable = isEditable || (user && user.get('isStaff'))

    // TODO: use icon instead text
    return isEditable ? (
      <div className={`text-right my-2`}>
        <Link route="edit" params={{ id: articleId }}>
          <a className={``}>
            <img
              src={require('/static/img/icon/ic-edit@2x.png')}
              height="20px"
              alt="edit"
            />
          </a>
        </Link>
        &nbsp;
        <Link route="delete" params={{ id: articleId }}>
          <a className={``} onClick={this.onDeleteClick}>
            <img
              src={require('/static/img/icon/ic-delete@2x.png')}
              height="14px"
              alt="delete"
            />
          </a>
        </Link>
      </div>
    ) : null;
  };

  onDeleteClick = e => {
    const r = confirm('คุณแน่ใจแล้วใช่ไหมที่จะลบ?');
    if (!r) {
      e.preventDefault();
    }
  }

  onLoginClick = title => {
    const { dispatch } = this.props;
    dispatch(showDialog(title));
  };

  onArticleClick = () => {
    const isExpanded = this.state.isExpanded;
    this.setState({ isExpanded: !isExpanded });
  };

  render() {
    const {
      data,
      isLoading,
      isReplyLoading,
      categoriesEditMode: _categoriesEditMode,
      aticleHyperlinkLoading,
      replyHyperlinkLoading,
      user,
    } = this.props;

    const article = data.get('article');
    const replyConnections = data.get('replyConnections');
    const relatedArticles = data.get('relatedArticles');

    let meterDegree = CalcDegreeFromReply(replyConnections);
    if (isLoading && article === null) {
      return <div>Loading...</div>;
    }

    if (article === null) {
      return <div>Article not found.</div>;
    }


    const categories = article.get('categories');

    let categoriesEditMode = _categoriesEditMode
      ? _categoriesEditMode
      : !categories || categories.size === 0;

    const expanded = this.state.isExpanded;

    let isMedia = true

    let renderText = article.get('text')
    if (renderText.startsWith('$image__')) {
      const fileId = renderText.split('__')[2]
      renderText = <img className={`image-content my-2`} src={`https://drive.google.com/uc?id=${fileId}`} style={{maxWidth: '100%'}} />
    } else if (renderText.startsWith('$video')) {
      const fileId = renderText.split('__')[2]
      renderText = (
        <div className={`position-relative d-inline-block`}>
          <video style={{maxWidth: '100%'}} controls={true} onClick={e => e.stopPropagation()}>
            <source src={`https://drive.google.com/uc?id=${fileId}`} />
          </video>
        </div>
      )
    } else {
      isMedia = false
    }

    let articleTitle = article.get('title') || (isMedia ? 'เรื่องที่มีคนสงสัย': article.get('text') )
    let slicedArticleTitle = articleTitle.slice(0, 20);


    return (
      <AppLayout>
        <div className="wrapper-main">
          <Head>
            <title>
              {slicedArticleTitle}⋯⋯ | {i18n.t('SiteName')}{' '}
              {i18n.t('realOrFake')}
            </title>

            <ClaimReviewJsonifier article={article} avgRadian={meterDegree} replyConnections={replyConnections} articleTitle={articleTitle} />

          </Head>

          {article.get('status') == 'DELETED'?
          <section className="section alert alert-danger">
            <h2>ข้อความนี้ได้ถูกลบไปแล้ว</h2>
          </section>
          : ``}

          <div className={`${article.get('status') == 'DELETED'? `d-none`: ``}`}>
            
            <section className="section ">
              <header className="header">
                {/* <h2>{i18n.t('originalMessage')}</h2> */}
                {/* <div className="trendline">
                  <Trendline id={article.get('id')} />
                </div> */}
                {/* <ArticleInfo article={article} /> */}
              </header>

              {this.renderEditButton(replyConnections, user, article)}

              <div className="card">

                <div className={`card-header d-md-flex align-items-center mb-3 ${article.get('title')? 'has-title': 'no-title bg-white'}`}>
                  <div className="item-replyRequestCount mr-3">
                    {article.get('replyRequestCount')} คนสงสัย
                  </div>

                  {article.get('title')?
                  <div className="item-title">{article.get('title')}</div>
                  :``}

                </div>
                
                <div className="card-body d-md-flex justify-content-md-between pt-0">
                  <div className="card-body-left  d-flex flex-column justify-content-between">
                    <article className="content" onClick={this.onArticleClick}>
                      <div>
                        {nl2br(
                          linkify(renderText, {
                            props: {
                              target: '_blank',
                            },
                          })
                        )}
                      </div>
                      <Hyperlinks
                        hyperlinks={article.get('hyperlinks')}
                        fetchCallback={this.handleFetchHyperlink}
                        hyperlinkLoading={aticleHyperlinkLoading}
                      />
                    </article>
                    
                    <div className="d-flex mt-3">
                      <span className={"postCreator item-createBy"}> {article.getIn(['user', 'name']) || `ไม่ระบุชื่อ`}</span>
                      <ArticleInfo article={article} />
                      <FlaggedReplyInfomation replyConnections={replyConnections} />
                    </div>
                
                    {expanded
                      ? article.get('replyRequests').map((replyRequest, index) => {
                          return (
                            <footer>
                            <ReplyRequestReason
                              key={`reason-${index}`}
                              index={index}
                              articleId={article.get('id')}
                              replyRequest={replyRequest}
                              isArticleCreator={index === 0}
                              onVoteReason={this.handleVoteReplyRequest}
                            />
                            </footer>
                          );
                        })
                      : null}
                  </div>
                  <div className="card-body-right">
                    <div className="d-flex flex-column align-items-center h-100 justify-content-end">
                    
                      <ArticleTruthMeter avgRadian={meterDegree} />
                      <div className="replyCount item-replyAmount">{replyConnections.filter(r => (r.get('reply').get('type') == 'NOT_RUMOR' || r.get('reply').get('type') == 'RUMOR_NOT_RUMOR' || r.get('reply').get('type') == 'RUMOR')).size} ความเห็น</div>
                    </div>
                  </div>
                </div>
                  
              
              </div>

              
              <div className={`mt-3`}>
                {categoriesEditMode ? (
                  <div className={`card card-secondary`}>
                    <div className="card-body">
                      <div>
                        <div>
                          <h5>{i18n.t(`specifyArticleCategory`)}</h5>
                          <div className={`text-secondary`}>
                            {i18n.t(`selectMinimum`)}
                          </div>
                        </div>
                        <form
                          className={`mt-2`}
                          ref={categoriesEl =>
                            (this._categoriesEl = categoriesEl)
                          }
                          onSubmit={e => {
                            e.preventDefault();
                            const checkboxArray = Array.prototype.slice.call(
                              this._categoriesEl
                            );
                            const checkedCheckboxes = checkboxArray.filter(
                              input => input.checked
                            );
                            const categories = checkedCheckboxes.map(
                              input => input.value
                            );
                            this.handleCategoriesSubmit(categories);
                          }}
                        >
                          <div>
                            {TYPE_ARTICLE_OPTIONS.map((item, i) => (
                              <div
                                key={i}
                                className="form-check form-check-inline"
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="categories"
                                  id={`article-category-${i}`}
                                  value={item}
                                  defaultChecked={
                                    categories &&
                                    categories.filter(c => c === item).size > 0
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={`article-category-${i}`}
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                          <div className={`mt-3`}>
                            <button className="btn btn-primary btn-sm">{i18n.t(`save`)}</button>
                            <button
                              className={`btn btn-link`}
                              onClick={e => {
                                e.preventDefault();
                                this.handleCategoriesEdit(false);
                              }}
                            >
                              {i18n.t(`cancel`)}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <h4>
                    <span>
                      {categories.map((item, i) => (
                        <span key={i} className="badge badge-primary mr-2">
                          {item}
                        </span>
                      ))}
                    </span>

                    <button
                      className={`btn btn-link`}
                      onClick={() => this.handleCategoriesEdit()}
                    >
                      <img
                        src={require('../components/AppLayout/images/edit.svg')}
                        width={12}
                        height={12}
                        alt="edit"
                      />
                    </button>
                  </h4>
                )}
              </div>
            

              
            </section>
            <section
              id="current-replies"
              className="section"
              ref={replySectionEl => (this._replySectionEl = replySectionEl)}
            >
              <CurrentReplies
                replyConnections={replyConnections}
                disabled={isReplyLoading}
                onDelete={this.handleReplyConnectionDelete}
                onRestore={this.handleReplyConnectionRestore}
                onVote={this.handleReplyConnectionVote}
                hyperlinkFetchCallback={this.handleFetchReplyHyperlink}
                replyHyperlinkLoading={replyHyperlinkLoading}
              />
            </section>
            <section className="section">
              <h2>{i18n.t('addNewResponse')}</h2>

              {user ? (
                <div>
                  {this.renderTabMenu()}
                  <div className="tab-content">{this.renderNewReplyTab()}</div>
                </div>
              ) : (
                <div>
                  {i18n.t('please')} &nbsp;
                  <a
                    href="#"
                    className={``}
                    onClick={e => {
                      e.preventDefault();
                      this.onLoginClick(i18n.t('login'));
                    }}
                  >
                    {i18n.t('login')}
                  </a>&nbsp;
                  {i18n.t('or')}&nbsp;
                  <a
                    href="#"
                    className={``}
                    onClick={e => {
                      e.preventDefault();
                      this.onLoginClick(i18n.t('signup'));
                    }}
                  >
                    {i18n.t('signup')}
                  </a>&nbsp;
                  {i18n.t('first')}
                </div>
              )}
            </section>
            {relatedArticles.size ? (
              
              <section className="section">
                <hr className="mb-2 mb-md-4" />
                <h3 className="pb-2 pb-md-4">{i18n.t('sentence.similarArticles')}</h3>
                <div>
                  {relatedArticles.map(article => (
                    <ArticleItem key={article.get('id')} article={article} />
                  ))}
                </div>
              </section>
            ) : (
              ''
            )}

          </div>

          <style jsx>{detailStyle}</style>
          <style jsx>{`
            .tab-content {
              background: #fff;
              padding: 20px;
              border: 1px solid #ccc;
              border-top: 0;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
            }
          `}</style>
        </div>
      </AppLayout>
    );
  }
}

function mapStateToProps({ articleDetail, auth }) {
  return {
    isLoading: articleDetail.getIn(['state', 'isLoading']),
    isReplyLoading: articleDetail.getIn(['state', 'isReplyLoading']),
    aticleHyperlinkLoading: articleDetail.getIn([
      'state',
      'aticleHyperlinkLoading',
    ]),
    replyHyperlinkLoading: articleDetail.getIn([
      'state',
      'replyHyperlinkLoading',
    ]),
    categoriesEditMode: articleDetail.getIn(['state', 'categoriesEditMode']),
    data: articleDetail.get('data'),
    user: auth.get('user'),
    isLoadingAuth: auth.getIn(['state', 'isLoading']),
  };
}

export default connect(mapStateToProps)(ArticlePage);
