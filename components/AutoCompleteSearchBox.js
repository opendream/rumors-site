import React from 'react';
import Router from 'next/router';
import './AutoCompleteSearchBox.css';
import { load } from '../ducks/frontPageSearchQuery';
import { connect } from 'react-redux';
import { List } from 'immutable';
import gql from '../util/gql';

export default class AutoCompleteSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      suggestions: [],
      queryText: '',
      cursor: 0,
    };
  }

  handleKeyDown(e) {
    const { cursor, suggestions } = this.state;
    if (e.keyCode === 38 && cursor > 0) {
      this.setState(prevState => ({
        cursor: prevState.cursor - 1,
      }));
    } else if (e.keyCode === 40 && cursor < suggestions.length - 1) {
      this.setState(prevState => ({
        cursor: prevState.cursor + 1,
      }));
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  handleQueryChange = e => {
    this.setState({ isSubmitting: true });
    const like = e.target.value.trim();
    this.setState(() => ({ queryText: like }));
    /////GraphQL Query
    // query {
    //   ListArticles(filter: { moreLikeThis: { like: "test" } }) {
    //     edges {
    //       node {
    //         text
    //       }
    //     }
    //   }
    // }
    console.log(like);
    // get the data, put the filter query in $text

    gql`
      query($like: String){
        ListArticles(filter: { moreLikeThis: { like: $like } }) {
          edges {
            node {
              text
            }
          }
        }
      }
    `({
      like,
    }).then(resp => {
      this.setState({ isSubmitting: false });
      console.log('response: ' + resp);

      if (resp.get('errors')) {
        console.error(resp.get('errors'));
        return;
      }
    });

    // const { items } = this.props;
    // const articles = this.state;
    // console.log(articles);
    //
    // let suggestions = [];
    // if (query.length > 0) {
    //   const regex = new RegExp(`^${query}`, 'i');
    //   suggestions = items.sort().filter(v => regex.test(v));
    // }
    //

    // console.log(suggestions);
  };

  renderSuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(item => (
          <li onClick={() => this.suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }

  suggestionSelected(value) {
    this.setState(() => ({ queryText: value, suggestion: [] }));
  }

  render() {
    const { queryText } = this.state;
    return (
      <div className="align-items-center">
        <div id="SearchQueryField" className="AutoCompleteSearchBox">
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                type="text"
                value={queryText}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleKeyDown}
                name="query"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="off"
              />
              {this.renderSuggestion()}
            </div>
            <div>
              <button className="btn btn-primary my-2 my-sm-0" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <style jsx>
          {`
            .form-inline .form-control {
              padding: 15px;
              font-size: 20px;
              height: auto;
              font-weight: 300;
            }
            .form-inline .form-control {
              width: 79%;
              margin-right: 1%;
            }
            .form-inline .btn {
              width: 20%;
              padding: 15px;
            }
            .btn-primary {
              background-color: #f0b4d0;
              border-color: #f0b4d0;
              font-size: 20px;
              color: #000;
            }
            .btn-primary:hover,
            .btn-primary:active,
            .btn-primary:focus {
              background-color: #ff79ac;
              border-color: #ff79ac;
              font-size: 20px;
              color: #000;
            }
          `}
        </style>
      </div>
    );
  }
}
