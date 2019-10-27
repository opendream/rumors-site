import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const mainStyle = css`
  main {
    padding: 1rem;
  }
  @media screen and (min-width: 768px) {
    main {
      padding: 1rem 40px 40px 40px;
    }
  }
`;

export const hintStyle = css`
  .hint {
    color: #aaa;
  }
`;
