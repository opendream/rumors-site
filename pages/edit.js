import React from 'react';
import { connect } from 'react-redux';

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
import CreateArticlePage from './create';

class EditArticlePage extends CreateArticlePage {
  static async getInitialProps({ store: { dispatch }, query: { id } }) {
    await dispatch(load(id));
    return { id };
  }
}

function mapStateToProps({ editArticleDetail }) {
  return {
    initial: editArticleDetail.get('data'),
  };
}
export default connect(mapStateToProps)(EditArticlePage);
