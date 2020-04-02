import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const indexStyle = css`
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 22px;
    font-family: Kanit, Helvetica, Arial, sans-serif;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 500;
  }
`;

export const jumbotronStyle = css`

  .jumbotron {
    margin-bottom: 0;
    position: relative;
    background: url('./img/jumbotron.jpg') center center no-repeat #222;
    background-size: cover;
    border-radius: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5rem 1rem 2rem 1rem;
  }
  @media screen and (min-width: 768px) {
    .jumbotron {
      height: 100%;
      max-height: 640px;
    }
  }
  .jumbotron .h2 {
    font-size: 1.3rem;
  }
  .jumbotron .h4 {
    font-size: 1rem;
    line-height: 1.5;
  }
  @media screen and (min-width: 768px) {
    .jumbotron .h2 {
      font-size: 2rem;
    }
    .jumbotron .h4 {
      font-size: 1.5rem;
    }
  }
  .jumbotron .text-center {
  }
  .jumbotron .emphasis {
    font-style: normal;
    color: #ffc107;
  }
  .jumbotron a.btn {
    font-size: 1rem;
  }
  @media screen and (min-width: 768px) {
    .jumbotron a.btn.btn-lg {
      min-width: 280px;
      font-size: 1.25rem;
    }
  }
`;

export const sectionStyle = css`
  .phone-container {
    margin: 0 20px;
    max-width: 100%;
    width: 360px;
    overflow: hidden;
  }
  .phone-container .phone-img {
    width: 100%;
    padding-bottom: 200%;
    background: url('img/phone-th.png') top center;
    background-size: cover;
    position: relative;
    align-self: flex-end;
  }
  .phone-container video {
    position: absolute;
    width: 84%;
    left: 8.2%;
    top: 9.2%;
  }

  .section {
    padding: 80px 20px;
  }
  .section .inner {
    margin: 0 auto;
    max-width: 1024px;
  }
  h2 {
    margin-bottom: 50px;
  }
  .huge {
    font-size: 3em;
    font-weight: 900;
  }
  .section-line {
    padding: 0 1rem;
  }
  @media screen and (min-width: 768px) {
    .section-line {
      padding: 0 2rem;
    }
  }
  .section-line .inner {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
  }
  .section-line .content {
    padding: 40px 0;
    min-width: 50%;
    -webkit-flex: 1;
    flex: 1;
    text-align: center;
  }
  @media screen and (min-width: 768px) {
    .section-line .content {
      text-align: left;
    }
  }
  .section-why {
    background: #fff url('img/cofacts-db-bg.jpg') bottom left no-repeat;
  }
  .section-why p {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.6);
  }
  .section-photos {
    padding: 0;
  }
  .section-photos .inner {
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;
  }
  .section-photos .photo {
    -webkit-flex: 1 1 auto;
    flex: 1 1 auto;
    width: 33%;
    height: 270px;
    background-color: #000;
    background-position: center center;
    background-size: cover;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  }
  .section-photos .photo .mask {
    content: ' ';
    width: 100%;
    height: 100%;
    display: block;
    background: #000;
    opacity: 0.5;
  }
  .section-photos .photo:hover .mask {
    opacity: 0;
  }
  .section-features {
    padding-top: 90px;
  }
  .section-features .icon {
    font-size: 90px;
    margin-bottom: 40px;
  }
  .section-features p {
    font-size: 0.9em;
    color: #555;
  }
  .section-contribute {
    background: #fff url('img/giraffe.jpg') bottom right no-repeat;
    background-size: 150px auto;
  }
  .section-footer {
    padding: 2rem 1rem;
    font-size: 16px;
  }
  .section-footer a {
    color: #9be;
  }
`;
