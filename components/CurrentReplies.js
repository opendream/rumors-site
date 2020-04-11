import React from 'react';
import Modal from './Modal';
import ReplyConnection from './ReplyConnection';
import i18n from '../i18n';

class DeletedItems extends React.Component {
  static defaultProps = {
    items: [],
    disabled: false,
    onRestore() {},
  };

  state = {
    showModal: false,
  };

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleRestore = (...args) => {
    this.handleClose();
    this.props.onRestore(...args);
  };

  renderModal = () => {
    if (!this.state.showModal) return null;
    const { items, disabled } = this.props;

    return (
      <Modal
        onClose={this.handleClose}
        style={{
          left: '40px',
          right: '40px',
          transform: 'none',
        }}
      >
        <h2>{i18n.t("deletedResponse")}</h2>
        <ul className="items">
          {items.map(conn => (
            <ReplyConnection
              key={`${conn.get('articleId')}__${conn.get('replyId')}`}
              replyConnection={conn}
              onAction={this.handleRestore}
              disabled={disabled}
              actionText={i18n.t("recoveryResponse")}
            />
          ))}
        </ul>
        <style jsx>{`
          h1 {
            padding: 0 24px;
          }
          .items {
            list-style-type: none;
            padding-left: 0;
          }
        `}</style>
      </Modal>
    );
  };

  render() {
    const { items } = this.props;

    if (!items || !items.length) return null;

    return (
      <li>
        <span className="prompt">
          {i18n.t("have")}{' '}
          <a href="javascript:;" onClick={this.handleOpen}>
            {items.length} {i18n.t("thenReply")}
          </a> {i18n.t("deleteByAuthor")}.
        </span>
        {this.renderModal()}

        <style jsx>{`
          li {
            padding: 12px 24px 0;
          }
          .prompt {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.5);
          }
        `}</style>
      </li>
    );
  }
}

export default function CurrentReplies({
  replyConnections,
  disabled = false,
  onDelete = () => {},
  onRestore = () => {},
  onVote = () => {},
  hyperlinkFetchCallback = null,
  replyHyperlinkLoading = false,
}) {
  if (!replyConnections.size) {
    return <p>{i18n.t("noReplyYet")}</p>;
  }

  const { expertConnections, validConnections, deletedConnections } = replyConnections.reduce(
    (agg, conn) => {
      if (conn.get('status') === 'DELETED') {
        agg.deletedConnections.push(conn);
      } else {
        if (conn.get('user') && conn.get('user').get('belongTo')) {
          agg.expertConnections.push(conn);
        } else {
          agg.validConnections.push(conn);
        }
      }

      return agg;
    },
    { expertConnections: [], validConnections: [], deletedConnections: [] }
  );

  return (
    <div>
      {expertConnections.length > 0?
      <>
        <h2>{i18n.t("expertResponse")}</h2>
        <ul className="items mb-5">
          {expertConnections.map(conn => (
            <ReplyConnection
              key={`${conn.get('articleId')}__${conn.get('replyId')}`}
              replyConnection={conn}
              onAction={onDelete}
              onVote={onVote}
              disabled={disabled}
              hyperlinkFetchCallback={hyperlinkFetchCallback}
              replyHyperlinkLoading={replyHyperlinkLoading}
            />
          ))}
        </ul>
      </>
      : ``}
      {/* <h2>{i18n.t("existingResponse")}</h2>  */}
      <div className="wrapper">
        {validConnections.map(conn => (
          <ReplyConnection
            key={`${conn.get('articleId')}__${conn.get('replyId')}`}
            replyConnection={conn}
            onAction={onDelete}
            onVote={onVote}
            disabled={disabled}
            hyperlinkFetchCallback={hyperlinkFetchCallback}
            replyHyperlinkLoading={replyHyperlinkLoading}
          />
        ))}
        <DeletedItems
          items={deletedConnections}
          onRestore={onRestore}
          disabled={disabled}
        />

      </div>
      <style jsx>{`
        // .items {
        //   list-style-type: none;
        //   padding-left: 0;
        // }
        
      `}</style>
    </div>
  );
}
