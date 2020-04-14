// Wrapper for all pages.
//
// Ref: https://github.com/zeit/next.js/blob/master/examples/with-redux/pages/index.js
//
import React, { Fragment } from 'react';
import Router from 'next/router';
import { setLogin } from '../../util/gql';
import { connect } from 'react-redux';
import { showDialog, load } from 'ducks/auth';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import LoginModal from '../Modal/LoginModal';
import moment from 'moment';
import NProgress from 'nprogress';

import 'normalize.css';
import 'nprogress/nprogress.css';
import './AppLayout.css';


import getConfig from 'next/config';
import i18n from 'i18n';

const {
  publicRuntimeConfig: { PUBLIC_MOMENT_LANGUAGE_CODE },
} = getConfig();

console.log('PUBLIC_MOMENT_LANGUAGE_CODE', PUBLIC_MOMENT_LANGUAGE_CODE)

const lng = PUBLIC_MOMENT_LANGUAGE_CODE || 'zh-tw';
if (PUBLIC_MOMENT_LANGUAGE_CODE !== 'en') {
  require(`moment/locale/${lng}`);
  moment.locale(PUBLIC_MOMENT_LANGUAGE_CODE);
}

let isBootstrapping = true;

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

class AppLayout extends React.Component {
  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      setLogin(() => props.dispatch(showDialog(i18n.t('login'))));
    }
  }

  componentDidMount() {
    // Bootstrapping: Load auth
    //
    if (isBootstrapping) {
      this.props.dispatch(load());
      isBootstrapping = false;
    }
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <div>
          <AppHeader />
          {children}
          <LoginModal />
          <AppFooter />
        </div>
        <style jsx global>{`
          body {
            font-family: 'Kanit', sans-serif;
            background: #F6F8FA;
            font-weight: 300;
          }
          div:not(.home) header.navbar {
            max-width: 1140px !important;
            margin: 0 auto;
          }
          div:not(.home) .wrapper-page {
            background: transparent !important;
          }
          div:not(.home) .nav-item {
            color: #000 !important;
          }
          div:not(.home) .link-group {
            border: 1px solid #000 !important;

          }
          div:not(.home) .link-list {
            border-right: 1px solid #000 !important;
            color: #000 !important;
          }

          a { color: #FF6DAD; }
          a:hover, a:active, a:focus {
            color: #B4195D;
          }

          button {
            border: 1px solid #ccc;
            font-weight: 300;
            border-radius: 3px;
          }

          .btn-sm { 
            padding: 2px 10px;
            border-radius: 15px;
          }

          .btn-secondary {
            background-color: #90A2AB;
            border-color: #90A2AB !important;
          }

          .btn-secondary:hover,
          .btn-secondary:active,
          .btn-secondary:focus {
            background-color: #728188 !important;
            border-color: #728188 !important;
          }

          .btn-primary {
            background-color: #f0b4d0;
            border-color: #f0b4d0;
            font-size: 16px;
            color: #000;
            border-radius: 10px;
          }
          .btn.btn-sm.btn-primary {
            font-size: 1.1rem !important;
          }

          .btn.btn-sm {
            min-width: 80px;
          }
          .btn.btn-md {
            min-width: 140px;
            font-size: 1.15rem;
          }

          @media screen and (min-width: 768px) {
            .btn-primary {
              font-size: 20px;
            }
          }

          .btn-primary:hover,
          .btn-primary:active,
          .btn-primary:focus {
            background-color: #ff79ac !important;
            border-color: #ff79ac !important;
            color: #000;
          }

          .btn-create::before {
            content: "";
            width: 20px;
            height: 20px;
            background-size: cover !important;
            background: url("/static/img/icon/btn-create@2x.png") no-repeat left center;
            display: inline-block;
          }

          .btn-link {
            color: #000;
            text-decoration: underline;
            
          }
          .btn-link:hover,
          .btn-link:active,
          .btn-link:focus {
            color: #f0b4d0;
          }

          .badge {
            white-space: pre-wrap
          }

          .badge-primary {
            background-color: #F0B4D0 !important;
          }

          .bubble
            {
              display: inline-block;
              position: relative;
              background: #F6F8FA;
              padding: 0.5rem 1rem;
              border-radius: 8px;
              border: #C9D4DA solid 1px;
              border-top-left-radius: 0;
              margin: 1rem 0;
            }
            
            .bubble:after
            {
              content: '';
              position: absolute;
              border-style: solid;
              border-width: 0 10px 14px 0;
              border-color: #F6F8FA transparent;
              display: block;
              width: 0;
              z-index: 1;
              top: -14px;
              left: 0px;
            }
            
            .bubble:before
            {
              content: '';
              position: absolute;
              border-style: solid;
              border-width: 0px 12px 15px 0;
              border-color: #C9D4DA transparent;
              display: block;
              width: 0;
              z-index: 0;
              top: -16px;
              left: -1px;
            }

          .w300 { font-weight: 300; }


          div.home header.navbar {
            max-width: 100% !important;
          }
        
          div.home .wrapper-page {
            background: url("/static/img/bg-banner@2x.jpg") no-repeat center center !important;
            background-size: cover !important;
            margin: -120px 0 0;
            padding: 120px 0 0px;
          }
          @media screen and (min-width: 769px) {
            div.home .wrapper-page {
              background: url("/static/img/bg-banner@2x.jpg") no-repeat top center !important;
              background-size: cover !important;
              margin: -160px 0 0;
              padding: 160px 0 0px;
            }
          }
          div.home .nav-item {
            color: #fff !important;
          }
          div.home .link-group {
            border: 1px solid #fff !important;
          }
          div.home .link-list {
            border-right: 1px solid #fff !important;
            color: #fff !important;
          }
          div.home #menuToggle a {
            color: #000 !important;
          }
          
          div.home #menuToggle .link-list {
            border-right: 1px solid #000 !important;
            color: #000 !important;
          }
          div.home #menuToggle .link-list:last-child { 
            border-right: 0 !important;
          }

          div #menuToggle .link-group {
            border: 1px solid #000 !important;
            display: inline-block;
          }

          .wrapper-main {
            padding: 0.5rem 1rem !important;
            max-width: 1140px !important;
            margin: 0 auto;
          }
          @media screen and (min-width: 768px) {
            .wrapper-main {
              padding: 1rem  !important;
            }
          }
          @media screen and (min-width: 1024px) {
            .wrapper-main {
              padding: 1rem 2rem !important;
            }
          }

          input[type=checkbox] {
            position: absolute !important;
            left: -1000em;
          }
          input[type=checkbox]:checked+label:before {
            background-position: 0 -20px;
          }

          input[type=checkbox]+label:before {
            content: "";
            display: inline-block;
            width: 20px;
            height: 20px;
            margin: 0 .5em 0 0;
            background: url("/static/img/icon/ic-check@2x.png") no-repeat 0 0;
            background-size: 20px;
            vertical-align: bottom;
            position: relative;
            bottom: 2px;
          }

          .btn-group-link .btn {
            margin-right: 0.5rem;
          }
          .btn-group-link input[type=radio] {
            position: absolute !important;
            left: -1000em;
          }
          .btn-group-link input:checked ~ .btn {
            background-color: #343a40;
            color: #fff;
          }
          @media screen and (max-width: 500px) {
            .btn-group-link .link {
              display: block;
            }
            .btn-group-link .link .btn {
              width: 100%;
              text-align: left;
            }
          }
         
          
          .input-group {
            background: url(/static/img/icon/ic-select@2x.png) no-repeat left center;
            background-size: 20px;
            padding-left: 20px;
            border-bottom: 1px solid #000;
            min-width: 200px;
            max-width: 95%;
          }
          .custom-select {
            background: none;
            border: none;
            font-size: 1rem;
            font-weight: 300;
          }
          @media screen and (min-width: 768px) {
            .custom-select {
              font-size: 1.15rem;
            }
          }
          .input-group .caret {
            position: absolute;
            right: 15px;
            bottom: 50%;
            transform: translate(-50%,0);
          }
          
          .input-group .caret:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            border-top: 7px solid #252525;
            border-left: 7px solid transparent;
            border-right: 7px solid transparent;
          }
          
          .input-group .caret:after {
            content: '';
            position: absolute;
            left: 2px;
            top: 0;
            border-top: 5px solid #F6F8FA;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
          }
          
        `}</style>
        
      </Fragment>
    );
  }
}

export default connect()(AppLayout);
