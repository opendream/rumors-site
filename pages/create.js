import React from 'react';
import gql from '../util/gql';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from 'components/AppLayout';

import i18n from '../i18n';

class CreateArticlePage extends React.Component {
  state = {
    isSubmitting: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });

    const text = e.target.text.value.trim();
    const reason = e.target.reason.value.trim();
    const reference = e.target.references.value.trim();

    gql`
      mutation(
        $text: String!
        $reference: ArticleReferenceInput!
        $reason: String
      ) {
        CreateArticle(text: $text, reference: $reference, reason: $reason) {
          id
        }
      }
    `({
      text,
      reason,
      reference: {
        type: 'URL',
        permalink: reference,
      },
    }).then(resp => {
      this.setState({ isSubmitting: false });

      if (resp.get('errors')) {
        console.error(resp.get('errors'));
        return;
      }

      const id = resp.getIn(['data', 'CreateArticle', 'id']);

      Router.push(`/article/${id}`);
    });
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <AppLayout>
        <div className="root">
          <Head>
            <title>{i18n.t("pageCreate.title")} | Cofacts {i18n.t("realOrFake")}</title>
          </Head>
          <form onSubmit={this.handleSubmit}>
            <h2>{i18n.t("originalMessage")}</h2>
            <textarea name="text" rows="6" />
            <h2>{i18n.t("reason")}</h2>
            <textarea name="reason" row="2" />
            <h2>{i18n.t("pageCreate.messageSource")}</h2>
            <input type="text" name="references" />

            <hr />

            <button type="submit" disabled={isSubmitting}>
              {i18n.t("pageCreate.sendMessage")}
            </button>
          </form>
          <style jsx>{`
            .root {
              padding: 0 40px 40px;
            }

            textarea,
            input {
              width: 100%;
            }
          `}</style>
        </div>
      </AppLayout>
    );
  }
}

export default CreateArticlePage;
