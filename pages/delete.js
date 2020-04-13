import React from 'react';
import gql from '../util/gql';
import Router from 'next/router';

import i18n from '../i18n';

class DeleteArticlePage extends React.Component {


  static async getInitialProps({ query: { id } }) {
    return { id };
  }
  
  constructor(props) {
    super(props)

    gql`
      mutation(
        $id: String
        $status: String
      ) {
        UpdateArticleStatus(
          id: $id
          status: $status
        ) {
          id
        }
      }
    `({
      id: props.id,
      status: 'DELETED'
    }).then(resp => {
      Router.push(`/article/${props.id}`);
    });
  }

  render() {
    return 'Deleteing ...'
  }
}

export default DeleteArticlePage;
