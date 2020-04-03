import React from 'react';
import Router from 'next/router';

export default class CreateArticleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnClick = () => {
    Router.push(`/create/`);
  };

  render() {
    const { user } = this.props;
    if (user != null) {
      return (
        <div>
          <button onClick={this.handleOnClick}>test</button>
        </div>
      );
    } else return null;
  }
}
