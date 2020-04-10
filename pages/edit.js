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
import ArticleTruthMeter from '../components/ArticleTruthMeter/ArticleTruthMeter';

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
} from 'ducks/editArticleDetail';
import i18n from '../i18n';

import { detailStyle, tabMenuStyle } from './article.styles';
import Routes from 'next-routes';
import { Link } from '../routes';

class EditArticlePage extends React.Component {
  state = {
    tab: 'search', // 'new, 'related', 'search'
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
    console.log('dispatch', dispatch);
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
              <span className="badge">{relatedReplyCount}</span>
            </span>
          )}
        </li>
        <li
          onClick={this.handleTabChange('search')}
          className={`tab ${tab === 'search' ? 'active' : ''}`}
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


  onLoginClick = title => {
    const { dispatch } = this.props;
    dispatch(showDialog(title));
  };

  onArticleClick = () => {
    const isExpanded = this.state.isExpanded;
    this.setState({ isExpanded: !isExpanded });
  };

  onEditArticleClick = () => {};

  render() {
    const { data, user } = this.props;

    console.log('DATATATATA : ' + data);

    const article = data.get('article');

    if (article === null) {
      return <div>article Edit not found.</div>;
    }

    const slicedArticleTitle = article.get('text').slice(0, 15);
    const existingText = data.get('article').get('text');
    const expanded = this.state.isExpanded;

    console.log("Existing Title : "+existingText);

    return (
      <AppLayout>
        <div className="root">
          <Head>
            <title>
              {slicedArticleTitle}⋯⋯ | {i18n.t('SiteName')}{' '}
              {i18n.t('realOrFake')}
            </title>
          </Head>

          <section className="section">
            <form onSubmit={this.handleSubmit}>

              <h2>{i18n.t( 'pageCreate.articleTitle' )}</h2>
              <input type="text" name="title" placeholder ={existingText} />

              <h2>{i18n.t( 'pageCreate.articleBody' )} *</h2>
              <textarea name="text" rows="6" placeholder ={existingText}/>

              <h2>{i18n.t( 'pageCreate.messageSource' )}</h2>
              <input type="text" name="references"placeholder ={existingText}/>

              <h2>{i18n.t( 'reason' )}</h2>
              <div className="form-text text-muted">
                {i18n.t( 'pageCreate.reasonDetail' )}
              </div>
              <textarea name="reason" row="2"/>

              <hr/>

              <button type="submit">
                {i18n.t( 'pageCreate.sendMessage' )}
              </button>
            </form>
          </section>

          <section className="section">
            <header className="header">
              <h2>PREVIEW</h2>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <ArticleInfo article={article} />
            </header>
            <article className="message" onClick={this.onArticleClick}>
              {nl2br(
                linkify(article.get('text'), {
                  props: {
                    target: '_blank',
                  },
                })
              )}
            </article>
            <footer>
              {expanded
                ? article.get('replyRequests').map((replyRequest, index) => {
                    return (
                      <ReplyRequestReason
                        key={`reason-${index}`}
                        index={index}
                        articleId={article.get('id')}
                        replyRequest={replyRequest}
                        isArticleCreator={index === 0}
                        onVoteReason={this.handleVoteReplyRequest}
                      />
                    );
                  })
                : null}
            </footer>
          </section>
          <style jsx>{detailStyle}</style>
          <style jsx>{`
            .tab-content {
              padding: 20px;
              border: 1px solid #ccc;
              border-top: 0;
            }
          `}</style>
        </div>
      </AppLayout>
    );
  }
}

function mapStateToProps({ editArticleDetail, auth }) {
  return {
    isLoading: editArticleDetail.getIn(['state', 'isLoading']),
    isReplyLoading: editArticleDetail.getIn(['state', 'isReplyLoading']),
    aticleHyperlinkLoading: editArticleDetail.getIn([
      'state',
      'aticleHyperlinkLoading',
    ]),
    replyHyperlinkLoading: editArticleDetail.getIn([
      'state',
      'replyHyperlinkLoading',
    ]),
    categoriesEditMode: editArticleDetail.getIn([
      'state',
      'categoriesEditMode',
    ]),
    data: editArticleDetail.get('data'),
    user: auth.get('user'),
    isLoadingAuth: auth.getIn(['state', 'isLoading']),
  };
}
export default connect(mapStateToProps)(EditArticlePage);
