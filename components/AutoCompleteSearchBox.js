import React from 'react';
import Router from 'next/router';
import './AutoCompleteText.css';

export default class AutoCompleteSearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.items = ['test', 't', 'no', 'why'];
    this.state = {
      suggestions: [],
      queryText: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isSubmitting: true });
    const searchQuery = e.target.query.value.trim();

    this.setState({ isSubmitting: false });

    Router.push(`/articles?q=${searchQuery}`);
  };

  handleQueryChange = e => {
    const query = e.target.value;

    let suggestions = [];
    if (query.length > 0) {
      const regex = new RegExp(`^${query}`, 'i');
      suggestions = this.items.sort().filter(v => regex.test(v));
    }

    this.setState(() => ({ suggestions, queryText: query }));
    console.log(suggestions);
  };

  renderSuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return <ul>{suggestions.map(item => <li onClick={()=>this.suggestionSelected(item)}>{item}</li>)}</ul>;
  }

  suggestionSelected(value) {
    this.setState(() => ({ queryText: value, suggestion: [] }));
  }

  render() {
    const { queryText } = this.state;
    return (
      <div className="align-items-center">
        <div id="SearchQueryField" className="AutoCompleteText">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={queryText}
              onChange={this.handleQueryChange}
              name="query"
            />
            <button type="submit">Search</button>
          </form>
          {this.renderSuggestion()}
        </div>
      </div>
    );
  }
}
