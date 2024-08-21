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
          <main className={`wrapper-main `}>
            <div className={`article-form-wrapper`}>
              <div className={`img-aw`}>
                <img src="/static/img/create-cofact.png" alt="create" width={'100%'} />
              </div>
              <div className={`card`}>
                <div className={`card-body`}>
                  <div className={`form-wrapper m-3`}>
                    <h2>{i18n.t('createArticle')}</h2> 
                    <p className={`text-muted`}>{i18n.t('createArticleFromTeaser')}</p>
                    <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                        <p className={`form-title`}>{i18n.t('pageCreate.articleTitle')}</p>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          defaultValue={defaultValue.get('title') || ''}
                        />
                      </div>
                      <div className="form-group">
                        <p className={`form-title`}>{i18n.t('pageCreate.articleBody')} <span className={`text-danger`}>*</span></p>
                        <textarea
                          name="text"
                          rows="6"
                          className="form-control"
                          defaultValue={defaultValue.get('text') || ''}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <p className={`form-title`}>{i18n.t('pageCreate.messageSource')}</p>
                        <input
                          type="text"
                          name="references"
                          className="form-control"
                          defaultValue={defaultValue.references || ''}
                        />
                      </div>
                      <div className="form-group">
                        <p className={`form-title`}>{i18n.t('reason')}</p>
                        <span className="form-text text-muted">
                          {i18n.t('pageCreate.reasonDetail')}
                        </span>
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
             
            </div>
          </main>

          <style jsx>{`
            .root {
              padding: 0 40px 40px;
            }

            textarea,
            input {
              width: 100%;
              padding: 10px 15px;
              border-radius: 8px;
              height: auto;
            }

            .article-form-wrapper {
              border: 1px solid #E1E1E1;
              background: #FFF;
              box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.15);
              display: flex;
              background: #fff;
              padding: 0
            }
            .article-form-wrapper .img-aw {
              background: #8CBEF3;
              width: 35%
            }
            .article-form-wrapper .card {
              width: 65%;
              border: 0;
              border-radius: 0;
            }
            .article-form-wrapper .card-body {
              padding: 20px 40px;
            }
            .article-form-wrapper .form-title {
              font-size: 1.25rem;
              font-weight: 500;
              margin-bottom: 0.25rem;
            }
            .article-form-wrapper p {
              font-size: 1.1rem;
            }
            .article-form-wrapper .text-danger {
              color: #E72121;
            }
            @media screen and (max-width: 767px) {
              .article-form-wrapper {
                flex-direction: column;
              }
              .article-form-wrapper .img-aw {
                display: none;
              }
              .article-form-wrapper .card {
                width: 100%;
                border: 0;
                border-radius: 0;
              }
              .article-form-wrapper .card-body {
                padding: 10px;
              }
            }
          `}</style>
        </div>
      </AppLayout>
    );
  }
}

export default CreateArticlePage;
