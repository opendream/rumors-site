import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const mainStyle = css`
  main.wrapper-main {
    padding: 0.5rem 1rem !important;
    max-width: 1140px !important;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    main.wrapper-main {
      padding: 1rem  !important;
    }
  }
  @media screen and (min-width: 1024px) {
    main.wrapper-main {
      padding: 1rem 2rem !important;
    }
  }
`;

export const hintStyle = css`
  .hint {
    color: #aaa;
  }
`;
