import React from 'react';
import Router from 'next/router';
import './AutoCompleteSearchBox.css';
import gql from '../util/gql';

export default class AutoCompleteSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      queryText: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const queryText = e.target.query.value.trim();

    Router.push(`/articles?q=${queryText}`);
  };

  handleQueryChange = e => {
    const queryText = e.target.value;

    let suggestions = [];
    if (queryText.length > 0) {
      gql`
        query($queryText: String) {
          ListRelatedArticles(queryText: $queryText, first: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      `({
        queryText,
      }).then(resp => {
        this.setState({ isSubmitting: false });

        if (resp.get('errors')) {
          console.error(resp.get('errors'));
          return;
        }

        let listEdges = resp.getIn(['data', 'ListRelatedArticles', 'edges']);
        listEdges.map(edge => {
          suggestions.push(edge.get('node').get('title'));
        });

        this.setState({ suggestions: suggestions, isSubmitting: false });
      });
    } else {
      this.setState({ suggestions: [] });
    }
    this.setState(() => ({ queryText: queryText }));
  };

  renderSuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="item">
        {suggestions.map(item => (
          <li className="list" onClick={() => this.suggestionSelected(item)}>
            {item}
          </li>
        ))}
        <style jsx>
          {`
            .item {
              list-style: none;
              margin: 1rem 0 0;
              padding: 0;
              float: left;
            }
            .item .list {
              display: inline-block;
              border: 1px solid #ccc;
              margin-right: 5px;
              border-radius: 10px;
              padding: 7px 15px;
              cursor: pointer;
            }
          `}
        </style>
      </ul>
    );
  }

  suggestionSelected(value) {
    this.setState(() => ({ queryText: value, suggestion: [] }));
    Router.push(`/articles?q=${value}`);
  }

  render() {
    const { queryText } = this.state;
    return (
      <div className="align-items-center">
        <div id="SearchQueryField" className="AutoCompleteSearchBox">
          <form
            onSubmit={this.handleSubmit}
            className="row no-gutters justify-content-center"
          >
            <div className="pr-2 col-9 col-md-10">
              <input
                className="form-control text-field "
                type="text"
                value={queryText}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleKeyDown}
                name="query"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
                placeholder="พิมพ์ข้อความที่ต้องการตรวจสอบ"
              />
              {this.renderSuggestion()}
            </div>
            <div className="col-3 col-md-2">
              <button className="btn btn-primary w-100" type="submit">
                ค้นหา
              </button>
            </div>
          </form>
        </div>
        <style jsx>
          {`
            .form-inline .form-control,
            .text-field {
              padding: 15px;
              font-size: 16px;
              height: auto;
              font-weight: 300;
              border-radius: 10px;
            }
            @media screen and (min-width: 768px) {
              .text-field {
                font-size: 20px;
              }
            }
            .form-inline .form-control {
              width: 79%;
              margin-right: 1%;
            }
            .btn {
              padding: 15px;
            }
            .form-inline .btn {
              width: 20%;
              padding: 15px;
            }
            .btn-primary {
              background-color: #f0b4d0;
              border-color: #f0b4d0;
              font-size: 16px;
              color: #000;
              border-radius: 10px;
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
          `}
        </style>
      </div>
    );
  }
}
