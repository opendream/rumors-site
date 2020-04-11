import React, { PureComponent } from 'react';
import moment from 'moment';

import { nl2br, linkify } from '../../util/text';

import { Link } from '../../routes';
import ExpandableText from '../ExpandableText';
import RepliesModal from '../Modal/RepliesModal';
import { sectionStyle } from '../ReplyConnection.styles';
import i18n from '../../i18n';

export default class SearchArticleItem extends PureComponent {
  state = {
    repliesModalOpen: false,
  };

  handleModalOpen = () => {
    this.setState({
      repliesModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      repliesModalOpen: false,
    });
  };

  handleOnConnect = event => {
    this.props.onConnect(event);
    this.handleModalClose();
  };

  render() {
    const { repliesModalOpen } = this.state;
    const { article } = this.props;
    const createdAt = moment(article.get('createdAt'));
    return (
      <li className="root">
        <button className="btn-sticky btn-secondary btn-sm" onClick={this.handleModalOpen}>
          {i18n.t("view")} {article.get('replyCount')} {i18n.t("reply")}
          
        </button>
        <header className="section">
          {createdAt.isValid() ? (
            <Link route="article" params={{ id: article.get('id') }}>
              <a>
                <div title={createdAt.format('lll')}>{createdAt.fromNow()}</div>
              </a>
            </Link>
          ) : (
            ''
          )}
        </header>
        <ExpandableText wordCount={40}>
          {nl2br(linkify(article.get('text')))}
        </ExpandableText>
        {repliesModalOpen && (
          <RepliesModal
            replies={article.getIn(['replyConnections'])}
            onModalClose={this.handleModalClose}
            onConnect={this.handleOnConnect}
          />
        )}
        <style jsx>{`
          .root {
            padding: 24px;
            border: 1px solid #ccc;
            border-top: 0;
          }
          .root:first-child {
            border-top: 1px solid #ccc;
          }
          .root:hover {
            background: rgba(0, 0, 0, 0.05);
          }
          li:last-child {
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .section {
            border-bottom: 0;
          }
          .btn-sticky {
            position: sticky;
            top: 0.3em;
            float: right;
            display: flex;
            flex-dirction: row;
            align-items: center;
            border-radious: 0.8em;
            cursor: pointer;
          }
          .icon-extend {
            height: 1em;
            width: auto;
            display: inline-block;
            margin-left: 0.5em;
          }
        `}</style>
        <style jsx>{sectionStyle}</style>
      </li>
    );
  }
}
