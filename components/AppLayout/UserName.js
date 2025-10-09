import React, { PureComponent } from 'react';
import { Link } from 'routes';
import LEVEL_NAMES from 'constants/levelNames';
import Modal from '../Modal';
import i18n from '../../i18n';

class ProgressBar extends PureComponent {
  static defaultProps = {
    ratio: 0, // 0 ~ 1
  };
  render() {
    const { ratio, ...progressProps } = this.props;

    return (
      <div className="progress" {...progressProps}>
        <i style={{ width: `${ratio * 100}%` }} />
        <style jsx>{`
          .progress {
            border: 1px solid #fff;
            padding: 1px;
            height: 8px;
            border-radius: 3px;
            background-color: white;
          }

          i {
            display: block;
            height: 100%;
            background: #F0B4D0;
          }
        `}</style>
      </div>
    );
  }
}

class UserNameForm extends PureComponent {
  static defaultProps = {
    name: '',
    onSubmit() {},
    onCancel() {},
  };

  componentDidMount() {
    if (this.inputEl) {
      this.inputEl.select();
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.inputEl) return;
    this.props.onSubmit(this.inputEl.value);
  };

  render() {
    const { name, onCancel } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="name-input"
          type="text"
          defaultValue={name}
          ref={el => (this.inputEl = el)}
        />
        <button className="submit" type="submit">
          Save
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>

        <style jsx>{`
          .name-input {
            width: 6em;
          }

          .submit {
            margin: 0 8px;
          }
        `}</style>
      </form>
    );
  }
}

class UserName extends PureComponent {
  static defaultProps = {
    onLoginClick() {},
    onLogoutClick() {},
    onUpdate() {},
    user: null, // Should be user after logged in
  };

  state = {
    isEditingUserName: false,
    showLevelUpPopup: false,
  };

  handleEdit = () => {
    this.setState({ isEditingUserName: true });
  };

  handleSubmit = name => {
    this.props.onUpdate(name);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ isEditingUserName: false });
  };

  renderInfo = () => {
    const { onLogoutClick, user } = this.props;

    return (
      <div className="user">
        <Link route="/replies?mine=1">
          <a>
            {user.get('name')} <br />
            <span>
              {user.get('belongTo')?
              `(${user.get('belongTo')})`
              : ``}
            </span>
          </a>
          
        </Link>
        <button className="edit" onClick={this.handleEdit}>
          <img
            src={require('/static/img/icon/ic-edit@2x.png')}
            width="20px"
            alt="edit"
          />
        </button>

        
        &nbsp;
        
        <button type="button" onClick={onLogoutClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3.99998C12 4.55227 11.5523 4.99998 11 4.99998H5L5 19H11C11.5523 19 12 19.4477 12 20C12 20.5523 11.5523 21 11 21H5C3.89543 21 3 20.1046 3 19V4.99998C3 3.89541 3.89543 2.99998 5 2.99998H11C11.5523 2.99998 12 3.4477 12 3.99998Z" fill="#999999"/>
          <path d="M15.0001 15.5858L17.5858 13.0001H9.00005C8.44776 13.0001 8.00005 12.5524 8.00005 12.0001C8.00005 11.4478 8.44777 11.0001 9.00005 11.0001L17.5858 11.0001L15 8.41426C14.6095 8.02374 14.6095 7.39058 15 7.00005C15.3905 6.60953 16.0237 6.60953 16.4142 7.00005L20.7072 11.293C20.8947 11.4805 21 11.7349 21 12.0001C21 12.2653 20.8947 12.5197 20.7072 12.7072L16.4143 17.0001C16.0238 17.3906 15.3906 17.3906 15.0001 17.0001C14.6096 16.6095 14.6096 15.9764 15.0001 15.5858Z" fill="#999999"/>
          </svg>
        </button>

        <style jsx>{`
          .user {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .user a {
            color: #000;
            font-weight: 500;
            width: 50px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .user button {
            border: none;
            padding: 0;
            background: transparent;
          }
          @media screen and (max-width: 320px) {
            .user a {
              max-width: 120px;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              word-break: keep-all;
              
            }
          }

          .edit {
            padding: 4px;
            margin: 0 12px 0 4px;
            opacity: 0.4;
            cursor: pointer;
            border: 0;
            background: transparent;
            margin-right: auto;
          }

          .edit:hover {
            opacity: 0.7;
          }
        `}</style>
      </div>
    );
  };

  renderLogin = () => {
    const { onLoginClick } = this.props;

    return <>
				<div className={`nav`}>
					<a className={`nav-item`} onClick={() => onLoginClick(i18n.t("login"))}>
						{i18n.t("login")}
					</a>
					{/* <a className={`link link-list`} onClick={() => onLoginClick(i18n.t("signup"))}>
						{i18n.t("signup")}
					</a> */}
					<style jsx>{`
						.link-group {
							list-style: none;
              display: flex;
              font-weight: 300;
              justify-content: center;
              align-items: center;
              // min-width: 190px;
              padding: 0.5rem;
              border-radius: 8px;
              background-color: #e0e6ea;
              border: none;
              box-sizing: border-box;
						}
              @media screen and (min-width: 992px) {
              .nav-item {
                  font-size: 1rem;
                  cursor: pointer;
                  margin-right: 1rem;
                  border-bottom: 2px solid transparent;
                }
              .nav-item:hover {
                  text-decoration: underline;
                  border-bottom: 2px solid currentColor;
                  -webkit-text-decoration: none !important;
                  text-decoration: none !important;
                }
              }
            

            @media screen and (max-width: 991px) {
               .nav {
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
               }
               .nav-item {
                padding: 10px 15px;
                font-size: 18px;
               }
            }
						
            `}</style>
				</div>
			</>;
  };

  renderLevel = () => {
    const { user } = this.props;
    const currentExp =
      user.getIn(['points', 'total']) - user.getIn(['points', 'currentLevel']);
    const levelExp =
      (user.getIn(['points', 'nextLevel']) || Infinity) -
      user.getIn(['points', 'currentLevel']);

    return (
      <div>
        <p className="level-info">
          Lv. {user.get('level')}{' '}
          <small>{LEVEL_NAMES[user.get('level')]}</small>
        </p>
        <ProgressBar
          ratio={currentExp / levelExp}
          title={`${currentExp} / ${levelExp}`}
        />
        <style jsx>{`
          .level-info {
            margin: 0;
          }

          .level-info small {
            margin-left: 8px;
          }
        `}</style>
      </div>
    );
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.user &&
      this.props.user &&
      prevProps.user.get('level') !== this.props.user.get('level')
    ) {
      // show level up popup
      this.setState({ showLevelUpPopup: true });
    }
  }
  render() {
    const { user, isLoading } = this.props;
    const { isEditingUserName } = this.state;

    if (isLoading) return 'Loading...';

    if (user) {
      return (
        <div className={`user-profile`}>
          {isEditingUserName ? (
            <UserNameForm
              name={user.get('name')}
              onSubmit={this.handleSubmit}
              onCancel={this.handleCancel}
            />
          ) : (
            this.renderInfo()
          )}
          {this.renderLevel()}
          {this.state.showLevelUpPopup && (
            <Modal
              onClose={() => {
                this.setState({ showLevelUpPopup: false });
              }}
            >
              <p
                style={{
                  padding: '30px 30px 20px',
                }}
              >
                {i18n.sentence.t('congratulationsPromoted')}
              </p>
            </Modal>
          )}
          <style jsx>{`
          .user-profile {
            padding: 0.5rem;
            border-radius: 2px;
            background-color: #e8e8e8;
            border: none;
            // box-shadow: 1px 1px 4px -3px #000000;
            box-sizing: border-box;
            font-size: 13px;
            position: fixed;
            right: 15px;
            top: 85px;
            z-index: 1;
          }
          @media screen and (max-width: 575px) {
            width: 100%;
            margin-top: 0;
          }
          `}</style>
        </div>
      );
    }

    return this.renderLogin();
  }
}

export default UserName;
