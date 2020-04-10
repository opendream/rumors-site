import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { feedbackStyle } from './ReplyFeedback.styles';
import Modal from './Modal';
import i18n from '../i18n';

class ReplyFeedback extends Component {
  static propTypes = {
    replyConnection: PropTypes.object.isRequired,
    onVote: PropTypes.func.isRequired,
  };
  state = {
    downVoteModalOpen: false,
  };
  handleUpVote = () => {
    const { replyConnection, onVote } = this.props;
    return onVote(replyConnection, 'UPVOTE');
  };

  handleDownVote = () => {
    const { replyConnection, onVote } = this.props;
    const comment = window.prompt(`${i18n.t("sentence.goodResponseNotHelp")}`);
    return onVote(replyConnection, 'DOWNVOTE', comment);
  };

  handleModalOpen = () => {
    this.setState({
      downVoteModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      downVoteModalOpen: false,
    });
  };

  getFeedbackScore = () => {
    const { replyConnection, currentUserId } = this.props;

    return replyConnection.get('feedbacks').reduce(
      (agg, feedback) => {
        const isOwnFeedback = feedback.getIn(['user', 'id']) === currentUserId;

        switch (feedback.get('score')) {
          case 1:
            agg.positiveCount += 1;
            isOwnFeedback && (agg.ownVote = 1);
            break;
          case -1:
            agg.negativeCount += 1;
            isOwnFeedback && (agg.ownVote = -1);
        }

        return agg;
      },
      { positiveCount: 0, negativeCount: 0, ownVote: 0 }
    );
  };

  render() {
    const { downVoteModalOpen } = this.state;
    const { currentUserId, replyConnection } = this.props;
    const { positiveCount, negativeCount, ownVote } = this.getFeedbackScore();

    const isOwnArticleReply =
      currentUserId === replyConnection.getIn(['user', 'id']);

    const downVoteReasons = replyConnection
      .get('feedbacks')
      .filter(feedback => !!feedback.get('comment'))
      .map((feedback, index) => (
        <li key={index}>
          {feedback.getIn(['user', 'name']) || `${i18n.t("otherUsers")}`}：{feedback.get(
            'comment'
          )}
        </li>
      ));

    return (
      <div className="reply-feedback">
        {!isOwnArticleReply && <label>{i18n.t("replyComponent.isItHelpfull")}</label>}
       
        
        <div className="mr-2">
          <button
            className="btn-vote"
            onClick={this.handleUpVote}
            disabled={isOwnArticleReply}
          >
            <img src="/static/img/icon/thumb-up@2x.png" width="16px" />
          
          </button>
          <span className="vote-num">{positiveCount}</span>
        </div>
        
        <div>
          <button
            className="btn-vote"
            onClick={this.handleDownVote}
            disabled={isOwnArticleReply}
          >
          <img src="/static/img/icon/thumb-down@2x.png" width="16px" />
          
          </button>
          <span className="vote-num">{negativeCount}</span>
        </div>
        
        {downVoteReasons.size > 0 && (
          <span className="ml-2">
            (<span className="down-vote-switch" onClick={this.handleModalOpen}>
              Why?
            </span>)
          </span>
        )}
        {downVoteModalOpen && (
          <Modal onClose={this.handleModalClose}>
            <div className="down-vote-modal">
              <h3 className="down-vote-title">{i18n.t("replyComponent.unhelpfulReason")}</h3>
              <ul className="down-vote-reasons">{downVoteReasons}</ul>
            </div>
          </Modal>
        )}
        <style jsx>{feedbackStyle}</style>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    currentUserId: auth.getIn(['user', 'id']),
  };
}

export default connect(mapStateToProps)(ReplyFeedback);
