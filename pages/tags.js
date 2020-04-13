/* eslint-disable react/display-name */
// https://github.com/yannickcr/eslint-plugin-react/issues/1200

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Head from 'next/head';
import { List } from 'immutable';
import { RadioGroup, Radio } from 'react-radio-group';
import { load } from 'ducks/tagList';

import AppLayout from 'components/AppLayout';
import ListPage from 'components/ListPage';
import Pagination from 'components/Pagination';

import i18n from '../i18n';

import { mainStyle } from './articles.styles';
import gql from 'util/gql';


class TagPriorityForm extends PureComponent {


  constructor(props) {
    super(props);

    this.  state = {
      mode: 'display',
      priority: props.tag.get('priority')
    }
  
  }

  handleSubmit = e => {
    e.preventDefault();

    const {tag} = this.props;

    if (!this.inputEl) return;
    const newPriority = this.inputEl.value;

    gql`
    mutation($title: String!, $priority: Int) {
      CreateOrUpdateTag(title: $title, priority: $priority) {
        title
        priority
      }
    }
    `({
      title: tag.get('title'),
      priority: parseInt(newPriority),
    }).then(resp => {
      this.setState({priority: newPriority, mode: 'display'})
    })

  }

  handleEdit = e => {
    e.preventDefault();
    this.setState({mode: 'edit'});

    setTimeout(() => {
      if (this.inputEl) {
        this.inputEl.select();
      }
    }, 0);
  }

  onCancel = e => {
    e.preventDefault();
    this.setState({mode: 'display'});
  }

  render() {
    const { tag } = this.props;
    const { mode, priority } = this.state;

    if (mode == 'display') {
      return (
        <div>
          {priority}
          <button className="edit" onClick={this.handleEdit}>
            <img
              src={require('../components/AppLayout/images/edit.svg')}
              width={12}
              height={12}
              alt="edit"
            />
          </button>
          <style jsx>{`

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
      )
    } else {

      
      return (
        <form onSubmit={this.handleSubmit}>
          <input
            className="name-input"
            type="numeric"
            defaultValue={tag.get('priority')}
            ref={el => (this.inputEl = el)}
          />
          <button className="submit" type="submit">
            Save
          </button>
          <button type="button" onClick={this.onCancel}>
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
      )
    }
  }
}

class TagList extends ListPage {

  inputEls = {}

  static async getInitialProps({ store, query, isServer }) {
    // Load on server-side render only when query.mine is not set.
    // This makes sure that reply list can be crawled by search engines too, and it can load fast
    if (isServer) return { query };
    await store.dispatch(load(query));
    return { query };
  }

  componentDidMount() {
    const { query, dispatch } = this.props;

    // Pick up initial data loading when server-side render skips
    // if (!query.mine) return;
    return dispatch(load(query));
  }

  handleAdd = e => {
    e.preventDefault();

    if (!this.inputEls.title) return;
    const title = this.inputEls.title.value;
    const priority = parseInt(this.inputEls.priority.value || 0);

    gql`
      mutation($title: String!, $priority: Int) {
        CreateOrUpdateTag(title: $title, priority: $priority) {
          title
          priority
        }
      }
    `({
      title: title,
      priority: priority,
    }).then(resp => {
      this.componentDidMount()
    })

  }

  handleDelete = tag => {

    gql`
      mutation($title: String!, $status: String) {
        CreateOrUpdateTag(title: $title, status: $status) {
          title
          status
        }
      }
    `({
      title: tag.get('title'),
      status: 'DELETED',
    }).then(resp => {
      this.componentDidMount()
    })

  }

  renderPagination = () => {
    const {
      query = {}, // URL params
      firstCursor,
      lastCursor,
      firstCursorOfPage,
      lastCursorOfPage,
    } = this.props;

    return (
      <Pagination
        query={query}
        firstCursor={firstCursor}
        lastCursor={lastCursor}
        firstCursorOfPage={firstCursorOfPage}
        lastCursorOfPage={lastCursorOfPage}
      />
    );
  };

  renderList = () => {
    const {
      tags = null,
      totalCount,
    } = this.props;

    console.log('tags', tags)
    return (
      <div>
        <p>{totalCount || 0} หมวดหมู่</p>
        {this.renderPagination()}
        <table className="tag-list table table-bordered">
          <thead>
            <tr>
              <th scope="col">ชื่อ</th>
              <th scope="col">ความสำคัญ (เรียงตามเลขมากไปน้อย)</th>
              <th scope="col">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr key={`add-new-tag`}>
              <td>
                <input type="text" ref={el => (this.inputEls.title = el)} />
              </td>
              <td>
                <input type="number" ref={el => (this.inputEls.priority = el)} />
              </td>
              <td>
                <button onClick={this.handleAdd}>เพิ่ม</button>
              </td>
            </tr>

            {tags.map(tag => (
              <tr key={tag.get('title')}>
                <td>
                  {tag.get('title')}
                </td>
                <td>
                  <TagPriorityForm tag={tag} />
                </td>
                <td>
                  <button onClick={(e) => this.handleDelete(tag)}>ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.renderPagination()}
        <style jsx>{`
          .tag-list {
            padding: 0;
          }
        `}</style>
      </div>
    );
  };

  render() {
    const { isLoading = false } = this.props;

    return (
      <AppLayout>
        <div className="wrapper-main">
          <Head>
            <title>รายการหมวดหมู่</title>
          </Head>
          <main className={`wrapper-main`}>
            <h2>รายการหมวดหมู่</h2>
            {isLoading ? <p>Loading...</p> : this.renderList()}
          </main>
          <style jsx>{mainStyle}</style>
        </div>
      </AppLayout>
    );
  }
}

function mapStateToProps({ tagList, auth }) {
  return {
    isLoggedIn: !!auth.get('user'),
    isLoading: tagList.getIn(['state', 'isLoading']),
    tags: (tagList.get('edges') || List()).map(edge => edge.get('node')),
    totalCount: tagList.get('totalCount'),
    firstCursor: tagList.get('firstCursor'),
    lastCursor: tagList.get('lastCursor'),
    firstCursorOfPage: tagList.getIn(['edges', 0, 'cursor']),
    lastCursorOfPage: tagList.getIn(['edges', -1, 'cursor']),
  };
}

export default connect(mapStateToProps)(TagList);
