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

    const initial = this.props.initial;
    const id = initial.getIn(['article', 'id']);
    const title = e.target.title.value.trim();
    const text = e.target.text.value.trim();
    const reason = e.target.reason.value.trim();
    const reference = e.target.references.value.trim();

    gql`
      mutation(
        $id: String
        $title: String
        $text: String!
        $reference: ArticleReferenceInput!
        $reason: String
      ) {
        CreateArticle(
          id: $id
          title: $title
          text: $text
          reference: $reference
          reason: $reason
        ) {
          id
        }
      }
    `({
      id,
      title,
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
    const initial = this.props.initial;
    let defaultValue;
    if (initial && initial.get) {
      defaultValue = initial.get('article') || {};
    } else {
      defaultValue = new Map();
    }
    // let article = defaultValue.get('article');
    // console.log("Default Value : "+article);

    return (
      <body>
        <AppLayout>
          <div className="wrapper-main">
            <Head>
              <title>
                {i18n.t('pageCreate.title')} | Cofacts {i18n.t('realOrFake')}
              </title>
            </Head>
            <main className={`wrapper-main`}>
              <div className={`card article-form-wrapper`}>
                <div className={`card-body`}>
                  <div className={`form-wrapper m-3`}>
                    <form onSubmit={this.handleSubmit}>
                      <h2>{i18n.t('pageCreate.articleTitle')}</h2>
                      <input
                        type="text"
                        name="title"
                        defaultValue={defaultValue.get('title') || ''}
                      />
                      <h2>{i18n.t('pageCreate.articleBody')} *</h2>
                      <textarea
                        name="text"
                        rows="6"
                        defaultValue={defaultValue.get('text') || ''}
                        required
                      />
                      <h2>{i18n.t('pageCreate.messageSource')}</h2>
                      <input
                        type="text"
                        name="references"
                        defaultValue={defaultValue.references || ''}
                      />
                      <h2>{i18n.t('reason')}</h2>
                      <div className="form-text text-muted">
                        {i18n.t('pageCreate.reasonDetail')}
                      </div>
                      <textarea
                        name="reason"
                        row="2"
                        defaultValue={defaultValue.get('reason') || ''}
                      />
                      <hr />

                      {isSubmitting?
                      <div>
                        กำลังส่งข้อความ ...
                      </div>
                      :
                      initial?
                      <button type="submit" disabled={isSubmitting}>
                        {`บันทึก`}
                      </button>
                      :
                      <button type="submit" disabled={isSubmitting}>
                        {i18n.t('pageCreate.sendMessage')}
                      </button>
                      }
                                            
                    </form>
                  </div>
                </div>
              </div>
            </main>

            <style jsx>{`
              .root {
                padding: 0 40px 40px;
              }

              textarea,
              input {
                width: 100%;
              }

              .article-form-wrapper {
                background-image: url(/static/img/bg-article-form.${isSubmitting
                    ? 'svg'
                    : 'png'});
              }
            `}</style>
          </div>
        </AppLayout>
      </body>
    );
  }
}

export default CreateArticlePage;
