import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import stringSimilarity from 'string-similarity';
import RelatedReplies from '../RelatedReplies';
import SearchArticleItem from './SearchArticleItem.js';

import { tabMenuStyle } from '../../pages/article.styles';
import i18n from '../../i18n';

const SearchArticles = ({ onConnect, searchArticles }) => {
  return (
    <ul className="items">
      {searchArticles.map(article => {
        return (
          <SearchArticleItem
            key={article.get('id')}
            article={article}
            onConnect={onConnect}
          />
        );
      })}
      <style jsx>{`
        .items {
          list-style-type: none;
          padding-left: 0;
        }
      `}</style>
    </ul>
  );
};

export default class ReplySearch extends PureComponent {
  state = {
    tab: false, // reply || article
    search: '',
  };

  handleSearch = event => {
    const {
      target: { value },
      key,
    } = event;

    if (key === 'Enter') {
      this.setState({ search: value });
      this.props.onSearch(event);
    }
  };

  handleTabChange = tab => () => {
    this.setState({ tab });
  };

  renderTabMenu = () => {
    const { articles, replies } = this.props;
    const { tab } = this.state;
    const replisCount = replies.size;
    const articlesCount = articles.size;

    return (
      <ul className="tabs">
        <li
          onClick={this.handleTabChange('reply')}
          className={`tab ${tab === 'reply' ? 'active' : ''} ${
            replisCount === 0 ? 'disabled' : ''
          }`}
        >
          {replisCount === 0 ? (
            `${i18n.t('sentence.noRelatedArticles')}`
          ) : (
            <span>
              {i18n.t('sentence.useRelavantReplies')} <span className="badge badge-primary">{replisCount}</span>
            </span>
          )}
        </li>
        <li
          onClick={this.handleTabChange('article')}
          className={`tab ${tab === 'article' ? 'active' : ''} ${
            articlesCount === 0 ? 'disabled' : ''
          }`}
        >
          {articlesCount === 0 ? (
            `${i18n.t('sentence.noRelatedArticles')}`
          ) : (
            <span>
              {i18n.t('sentence.browseRelatedArticles')} <span className="badge badge-primary">{articlesCount}</span>
            </span>
          )}
        </li>
        <li className="empty" />
        <style jsx>{`
          .tabs {
            margin-top: 20px;
          }
          .badge {
            padding: 5px 12px;
          }
        `}</style>
        <style jsx>{tabMenuStyle}</style>
      </ul>
    );
  };

  renderSearchReplyTab = () => {
    const { articles, replies, onConnect } = this.props;
    const { tab, search } = this.state;

    const getArticleSimilarity = relatedArticleText =>
      stringSimilarity.compareTwoStrings(search, relatedArticleText);

    switch (tab) {
      case 'reply':
        return (
          <RelatedReplies
            onConnect={onConnect}
            relatedReplies={replies}
            getArticleSimilarity={getArticleSimilarity}
          />
        );

      case 'article':
        return (
          <SearchArticles onConnect={onConnect} searchArticles={articles} />
        );

      default:
        return null;
    }
  };

  render() {
    const { search } = this.state;
    const { articles, replies } = this.props;

    return (
      <div className="form">
        <div className="form-inline">
          <div className="form-group">
            <label htmlFor="replySeach">
              {i18n.t('sentence.searchForRelevantReplies')}{' : '}
            </label>
            <input id="replySeach" className="form-control ml-2" type="search" onKeyUp={this.handleSearch} />
          </div>
        </div>
          

          {articles.size || replies.size ? (
            <Fragment>
              {this.renderTabMenu()}
              <div key="tab-content" className="tab-content">
                {this.renderSearchReplyTab()}
              </div>
            </Fragment>
          ) : (
            search && (
              <div className="search-none">{`- ${i18n.t("replySearch.findNo")}${search}${i18n.t('replySearch.relatedRepliesAndArticles')} -`}</div>
            )
          )}

          <style jsx>{`
            .tab-content {
              padding: 20px;
              border: 1px solid #ccc;
              border-top: 0;
            }
            .search-none {
              margin-top: 20px;
              color: gray;
              text-align: center;
            }
            
          `}</style>
        </div>
    );
  }
}

ReplySearch.propTypes = {
  onConnect: PropTypes.func.isRequired, // get replyId by event.target.value for reply connection
  onSearch: PropTypes.func.isRequired,
  articles: PropTypes.object.isRequired,
  replies: PropTypes.object.isRequired,
};
