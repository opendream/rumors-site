import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const listItemStyle = css`

  .card {
    box-shadow: 0 7px 15px 0 rgba(0,0,0,0.15);
  }
  .card-header {
    background: #CCD5D9;
    border-color: #CCD5D9;
  }

  .card-header .item-title,
  .card-header .item-text {
    font-size: 1.25rem;
    font-weight: 500;
  }

  .card-header.bg-white {
    border-color: #fff;
  }

  .item-replyRequestCount {
    
  }
  .item-replyRequestCount::before {
    content: "";
    padding-right: 30px;
    background: url(/static/img/icon/ic-que@2x.png) no-repeat left center;
    background-size: 25px;
  }

  

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
