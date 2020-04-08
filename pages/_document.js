import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { PUBLIC_GA_TRACKER, AUTOTRACK_FILENAME },
} = getConfig();

// issue #128
// const SITE_STRUCTURED_DATA = JSON.stringify({
//   '@context': 'http://schema.org',
//   '@type': 'WebSite',
//   name: 'Cofacts',
//   alternateName: '真的假的——轉傳訊息查證',
//   url: 'https://cofacts.g0v.tw',
// });

class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
                ga('create', '${PUBLIC_GA_TRACKER}', 'auto');
                ga('require', 'eventTracker');
                ga('require', 'outboundLinkTracker');
                ga('require', 'urlChangeTracker');

                ga('send', 'pageview');
              `,
            }}
          />
          <meta property="og:title" content="Cofact - พื้นที่เปิดให้ทุกคนมาช่วยกันตรวจสอบข่าวลวง" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="	https://cofact.org/" />
          <meta property="og:image" content="/static/img/cofact-fb-share.jpg" />
          <meta property="og:description" content="คนใกล้ชิดของคุณ อาจตกเป็นเหยื่อของข่าวลวง หรือ ส่งต่อข่าวลวงบนอินเทอร์เน็ตโดยไม่รู้ตัว" />
          <link rel="icon" href="/static/img/favicon.png" type="image/png" sizes="32x32"></link>
          
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400;500;600&display=swap" rel="stylesheet"></link>
      
          <script async src="https://www.google-analytics.com/analytics.js" />
          <script async src={`/static/${AUTOTRACK_FILENAME}`} />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* issue #128
            <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: SITE_STRUCTURED_DATA }}
            />
          */}
        </body>
      </html>
    );
  }
}

export default MyDocument;
