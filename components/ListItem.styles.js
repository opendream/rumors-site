import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const listItemStyle = css`
  .item {
    --font-size: 0.8em; // for ArticleInfo && articleItemWidget layout
    --list-item-padding: 8px;
    // display: block;
    // position: relative;
    // padding: var(--list-item-padding) 0;
    // border-top: 1px solid rgba(0, 0, 0, 0.2);
    text-decoration: none;
    color: rgba(0, 0, 0, 0.88);
    cursor: pointer;

    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
  }
  .item:first-child {
    border-top-right-radius: .25rem;
    border-top-left-radius: .25rem;
  }
  .item:last-child {
    margin-bottom: 0;
    border-bottom-right-radius: .25rem;
    border-bottom-left-radius: .25rem;
  }
  .item.read {
    background-color: #f1f1f1;
    color: rgba(0, 0, 0, 0.3);
  }
  .item.not-article {
    background-color: #feff3b45;
  }
  .item:hover {
    background-color: rgba(245, 183, 210, 0.20);
  }
  // .item:first-child {
  //   border: 0;
  // }
  .item-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
