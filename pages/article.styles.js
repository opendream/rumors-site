import css from 'styled-jsx/css'; // eslint-disable-line import/no-unresolved

export const detailStyle = css`


.card {
  box-shadow: 0 7px 15px 0 rgba(0,0,0,0.15);
  border: 0;
  border-radius: 10px;
}
.card-secondary {
  background-color: #E9EDF0;
  border: 1px solid #C9D4DA;
  box-shadow: none;
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
}
@media screen and (min-width: 576px) {
  .card-header .item-title,
  .card-header .item-text {
    font-size: 1.25rem;
    font-weight: 500;
  }
}


.card-header.bg-white {
  border-color: #fff;
}

.badge {
  font-weight: 400;
  padding: 5px 10px;
  min-width: 60px;
  font-size: 14px;
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
  font-size: 90%; 
}
@media screen and (min-width: 576px) {
  .item-opinionReplyAmount,
  .item-outOfScopeReplyAmount {
    border-left: 1px solid #9E9E9E;
    padding-left: 5px;
    margin-left: 5px;
  }
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

.card-body-left {
  width: 100%;
  margin-bottom: 1rem;
}
.card-body-right {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .card-body-left {
    width: 75%;
    margin-bottom: 0;
  }
  .card-body-right {
    width: 25%;
  }
}

article.content {
  font-size: 1.25rem;
  font-weight: 400;
}
article.content a {
  color: #F0B4D0;
}






  .root {
    padding: 24px;
  }
  @media screen and (min-width: 768px) {
    .root {
      padding: 40px;
    }
  }
  .section {
    margin-bottom: 64px;
  }
  .header {
    display: flex;
    align-items: center;
    flex-flow: row wrap;
  }
  .header > .trendline {
    margin: 0 16px 0 auto;
  }
  .message {
    border: 1px solid #ccc;
    background: #eee;
    border-radius: 3px;
    padding: 24px;
    word-break: break-all;
  }
  .items {
    list-style-type: none;
    padding-left: 0;
  }
`;

export const tabMenuStyle = css`
  .tabs {
    display: flex;
    font-size: 16px;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }
  .tabs li {
    list-style: none;
  }
  .tab {
    padding: 16px 20px;
    border: 1px solid #ccc;
    background: #eee;
    display: flex;
    align-items: center;
  }
  .tab:hover {
    background: #f8f8f8;
  }
  .tab + .tab {
    border-left: 0;
  }
  .tab.active {
    border-bottom-color: transparent;
    background: #fff;
  }
  .tab.disabled {
    color: #bbb;
    pointer-events: none;
  }
  .badge {
    background: #999;
    color: #fff;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 0.75em;
    margin-left: 8px;
  }
  .empty {
    flex: 1;
    border-bottom: 1px solid #ccc;
  }
`;
