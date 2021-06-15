import React from 'react';
import Head from 'next/head';
import AutoCompleteSearchBox from '../components/AutoCompleteSearchBox';
import AppLayout from 'components/AppLayout';
import { indexStyle, jumbotronStyle, sectionStyle } from './index.styles';
import Modal from '../components/Modal';
import i18n from '../i18n';
import getConfig from 'next/config';
import { hideDialog, load, showDialog } from '../ducks/auth';
import { connect } from 'react-redux';
import { waitForAuth, loadLevel } from '../ducks/auth';
import gql, { setLogin } from '../util/gql';

const {
  publicRuntimeConfig: { PUBLIC_API_URL },
} = getConfig();

class MembershipPage extends React.Component {
  constructor(props) {
    super(props);

    const redirectUrl = `/membership`;
    const nextUrl =  typeof (window) !== 'undefined'? window.location.origin + "/membership": `/membership`;

    const title = `${i18n.t('login')}`;
    const action = 'login';
    const switchTarget = `${i18n.t('signup')}`;

    this.state = ({
      redirectUrl: redirectUrl,
      nextUrl: nextUrl,
      title: title,
      action: action,
      switchTarget: switchTarget,
      isLoading: true,
      user: null
    });

  }

  componentDidMount() {
    let self = this;
    gql`
        {
            GetUser {
                id
                name
                avatarUrl
                belongTo
                isStaff
            }
        }
    `().then(resp => {
      if (typeof (resp.toJSON().data) !== "undefined" && typeof (resp.toJSON().data.GetUser) !== "undefined") {
        self.setState({
          isLoading: false,
          user: resp.toJSON().data.GetUser
        });
      } else {
        self.setState({
          isLoading: false,
        });
      }

    });
  }

  onSubmit = e => {
    if (location.origin != PUBLIC_API_URL) {
      return;
    }

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const dest = `${PUBLIC_API_URL}/login/local?action=${this.state.action}&redirect=/&next=${this.state.nextUrl}`;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      console.log(this.readyState, this.status, this.responseText);
      if (this.readyState == 4 && this.status == 200) {
        // console.log('this.responseText', this.responseText)
        location.reload();
      } else if (this.readyState == 4 && this.status == 401) {
        alert('อีเมล หรือ รหัสผ่าน ไม่ถูกต้อง');
      }
    };

    xhttp.open('POST', dest, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`email=${email}&password=${password}`);
  };

  onSwitchClick = e  => {
    let action = this.state.action;

    if (action === 'login') action = 'signup';
    else action = 'login';

    let title = action === 'login'
      ? (i18n.t('login'))
      : (i18n.t('signup'));

    let switchTarget = (i18n.t('signup'));
    if (title === `${i18n.t('login')}`)  switchTarget = (i18n.t('signup'));
    else switchTarget = (i18n.t('login'));

    this.setState({
      action: action,
      title: title,
      switchTarget: switchTarget
    })
  };

  render() {
    return (
      <div>
        {this.state.isLoading? <div>
          <h3 className="text-title">{i18n.t(`รอสักครู่`)}</h3>
          <style jsx>{`
          .text-title {
            font-family: kanit;
            text-align: center;
            margin: 2rem 0;
          }
          `}</style>
        </div>: <div>
          {this.state.user == null? (
            <div>
              <div className="wrapper-membership">
                <div className="root">
                  <h4 className={`mb-4`}>
                    {this.state.title}
                  </h4>

                  <div>
                    <form
                      action={`${PUBLIC_API_URL}/login/local?action=${this.state.action}&redirect=/&next=${this.state.nextUrl}`}
                      method="post"
                      onSubmit={this.onSubmit}
                    >
                      <div className="form-group">
                        <input
                          name="email"
                          type="email"
                          className={`form-control`}
                          placeholder={i18n.t(`email`)}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          name="password"
                          type="password"
                          className={`form-control`}
                          placeholder={i18n.t(`password`)}
                          autoComplete="false"
                        />
                      </div>

                      <input type="hidden" name="next" value={this.state.nextUrl} />
                      <input type="hidden" name="redirect" value={`/`} />
                      <input type="hidden" name="action" value={this.state.action} />

                      <button type="submit" className="btn btn-primary btn-block">
                        {this.state.title}
                      </button>
                    </form>
                    <div className="mt-3 text-center">
                      {i18n.t('or')} <a className="btn-link" onClick={this.onSwitchClick}> {this.state.switchTarget}</a>
                    </div>
                  </div>
                  <hr />
                  <div className={`text-center mt-2 mb-1`}>
                    <small className={`text-secondary`}>
                      {i18n.t(`or Connect with Social Media`)}
                    </small>
                  </div>

                  <div>
                    <a
                      className={`btn btn-outline-secondary btn-block btn-facebook`}
                      href={`${PUBLIC_API_URL}/login/facebook?redirect=${this.state.redirectUrl}`}
                    >
                      {i18n.t(`Connect with Facebook`)}
                    </a>
                    {/* <a className={`btn btn-outline-secondary btn-block`} href={`${PUBLIC_API_URL}/login/twitter?redirect=${redirectUrl}`}>
            Twitter
          </a>
          <a className={`btn btn-outline-secondary btn-block`} href={`${PUBLIC_API_URL}/login/github?redirect=${redirectUrl}`}>
            Github
          </a> */}
                  </div>
                </div>
                <style jsx>{`
                .wrapper-membership {
                  display: flex;
                  align-items: center;
                  min-height: calc(100vh);
                  width: 100%;
                  background: rgba(0,0,0,0.8);
                }
                .root {
                  background: #fff;
                  padding: 20px;
                  font-family: Kanit, Helvetica, Arial, sans-serif;
                  border: 1px solid #eee;
                  border-radius: 10px;
                  margin: 2rem auto;
                  max-width: 500px;
                  width: 90%;
                }
                .form-control {
                  border-radius: 10px;
                  padding: 1.5rem 1rem;      
                }
                .btn {
                  border-radius: 10px;
                }
                .btn-facebook {
                  background-color: #1877f2;
                  border-color: #1877f2;
                  color: white;
                  padding: 10px;
                }
                .btn-facebook:hover {
                  background-color: #145dbb;
                  border-color: #145dbb;
                }
                a {
                  cursor: pointer;
                  
                }
                .btn-primary {
                    background-color: #f0b4d0;
                    border-color: #f0b4d0;
                    font-size: 16px;
                    color: #000;
                    border-radius: 10px;
                }
              `}</style>
              </div>

            </div>

             ): <div>
            <h3 className="text-title">คุณ {this.state.user.name}  <a href="https://cofact.org/articles">ไปที่หน้าหลัก</a></h3>
            <style jsx>{`
            .text-title {
              font-family: kanit;
              text-align: center;
              margin: 2rem 0;
            }
            a { color: #E57CAB; }
            a:hover,
            a:focus,
            a:active { color:#E57CAB; }
            `}</style>
          </div> 
          
          }
        </div> }
       </div>

    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.get('user'),
    isLogin: auth.get('user'),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembershipPage);

