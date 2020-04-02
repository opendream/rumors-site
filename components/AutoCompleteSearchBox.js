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
          <form onSubmit={this.handleSubmit} className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="text"
              value={queryText}
              placeholder="พิมพ์ข้อความที่ต้องการตรวจสอบ"
              onChange={this.handleQueryChange}
              name="query"
            />
            <button className="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
          </form>
          {this.renderSuggestion()}
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
            margin-right: 1%
          }
          .form-inline .btn {
            width: 20%;
            padding: 15px;
          }
          .btn-primary {
            background-color: #F0B4D0;
            border-color: #F0B4D0;
            font-size: 20px;
            color: #000;
          }
          .btn-primary:hover, .btn-primary:active, .btn-primary:focus {
            background-color: #FF79AC;
            border-color: #FF79AC;
            font-size: 20px;
            color: #000;
          }
          `}</style>
      </div>
    );
  }
}
