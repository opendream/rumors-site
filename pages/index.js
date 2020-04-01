import React from 'react';
import Head from 'next/head';
import Router from 'next/router';

import FrontPageLayout from 'components/FrontPageLayout';

import i18n from '../i18n';

class IndexPage extends React.Component {
  state = {
    isSubmitting: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  render() {
    const { isSubmitting } = this.state;

    return (
      <FrontPageLayout>
        <div className="root">
          <Head>
            <title>
              {i18n.t('pageCreate.title')} | Cofacts {i18n.t('realOrFake')}
            </title>
          </Head>

          <div className="jumbotron text-light">
            <div className="text-center">
              <h1 className="mb-2 h2">
                Cofacts - พื้นที่เปิดเพื่อการตรวจสอบข่าวลวงร่วมกัน
              </h1>
              <h2 className="mb-2 h4">
                คนใกล้ชิดของคุณอาจจะส่งต่อ<em className="emphasis">
                  ข่าวลวงบนอินเทอร์เน็ต
                </em>โดยไม่รู้ตัว?
              </h2>
              <p>
                ติดตาม LINE Bot
                หรือเข้าร่วมทีมบรรณาธิการเพื่อช่วยกันปกป้องคนที่คุณห่วงใยจากข่าวลวงออนไลน์!
              </p>
              <div className="align-items-center">
                <div id="SearchQueryField">
                  <form onSubmit={this.handleSubmit}>
                    <h2>Search here</h2>
                    <input type="text" name="query" />
                    <hr />

                    <button type="submit" disabled={isSubmitting}>
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

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
      </FrontPageLayout>
    );
  }
}

export default IndexPage;
