import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const listItemStyle = css`

  .card {
    box-shadow: 0 7px 15px 0 rgba(0,0,0,0.15);
    border: 0;
    border-radius: 10px;
  }
  .card-header {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background: #CCD5D9;
    border-color: #CCD5D9;
  }

  .card-header .item-title,
  .card-header .item-text {
    font-size: 1.25rem;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 70%;
  }

  .card-header.bg-white {
    border-color: #fff;
  }

  .badge {
    font-weight: 400;
    padding: 5px 10px;
    min-width: 60px;
    font-size: 90%;
  }

  .item-replyRequestCount::before {
    content: "";
    padding-right: 30px;
    background: url(/static/img/icon/ic-que@2x.png) no-repeat left center;
    background-size: 25px;
  }
  .item-createBy {
    color: #9E9E9E;
    font-size: 90%;
  }
  .item-createBy::before {
    content: "";
    padding-right: 25px;
    background: url(/static/img/icon/ic-profile@2x.png) no-repeat left center;
    background-size: 20px;
  }

  .item-replyAmount::before {
    content: "";
    padding-right: 25px;
    background: url(/static/img/icon/ic-comment@2x.png) no-repeat left center;
    background-size: 20px;
  }


  .item-opinionReplyAmount,
  .item-outOfScopeReplyAmount {
    border-left: 1px solid #9E9E9E;
    padding-left: 5px;
    margin-left: 5px;
    font-size: 90%; 
  }
  .item-outOfScopeReplyAmount::before {
    content: "";
    padding-right: 25px;
    background: url(/static/img/icon/ic-warning@2x.png) no-repeat left center;
    background-size: 20px;
  }
  .item-opinionReplyAmount::before {
    content: "";
    padding-right: 25px;
    background: url(/static/img/icon/ic-comments@2x.png) no-repeat left center;
    background-size: 20px;
  }
  
  @media screen and (min-width: 768px) {
    .card-body-left {
      width: 75%
    }
    .card-body-right {
      width: 25%;
    }
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
