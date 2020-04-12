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
    const id = (initial && initial.getIn(['article', 'id'])) || null;
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
                    <div className="form-group">
                      <h3>{i18n.t('pageCreate.articleTitle')}</h3>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        defaultValue={defaultValue.get('title') || ''}
                      />
                    </div>
                    <div className="form-group">
                      <h3>{i18n.t('pageCreate.articleBody')} *</h3>
                      <textarea
                        name="text"
                        rows="6"
                        className="form-control"
                        defaultValue={defaultValue.get('text') || ''}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <h3>{i18n.t('pageCreate.messageSource')}</h3>
                      <input
                        type="text"
                        name="references"
                        className="form-control"
                        defaultValue={defaultValue.references || ''}
                      />
                    </div>
                    <div className="form-group">
                      <h3>{i18n.t('reason')}</h3>
                      <small className="form-text text-muted">
                        {i18n.t('pageCreate.reasonDetail')}
                      </small>
                      <textarea
                        name="reason"
                        row="2"
                        className="form-control"
                        defaultValue={defaultValue.get('reason') || ''}
                      />
                    </div>
                    
                    <div className="form-group">
                      {isSubmitting ? (
                        <div>กำลังส่งข้อความ ...</div>
                      ) : initial ? (
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                          {`บันทึก`}
                        </button>
                      ) : (
                        <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                          {i18n.t('pageCreate.sendMessage')}
                        </button>
                      )}
                    </div>
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
    );
  }
}

export default CreateArticlePage;
