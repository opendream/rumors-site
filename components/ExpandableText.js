import React from 'react';
import { truncate } from '../util/text';
import i18n from '../i18n';

export default class ExpandableText extends React.Component {
  static defaultProps = {
    children: '',
    wordCount: 140,
  };

  state = {
    isExpanded: false,
  };

  toggleExapnd = () => {
    this.setState(({ isExpanded }) => ({ isExpanded: !isExpanded }));
  };

  renderToggleButton = () => {
    const { isExpanded } = this.state;
    return (
      <button
        key="expandable-text-more-button"
        className="more"
        onClick={this.toggleExapnd}
      >
        {isExpanded ? `${i18n.t("hideFullText")}` : `${i18n.t("readmore")}`}
        <style jsx>{`
          .more {
            border: 0;
            background: transparent;
            text-decoration: underline;
          }
        `}</style>
      </button>
    );
  };

  render() {
    const { children, wordCount } = this.props;
    const { isExpanded } = this.state;

    // Note: if "children" is short enough, this.state.isExpanded should never be true.
    //
    if (isExpanded) {
      return (
        <div>
          {children}
          {this.renderToggleButton()}
        </div>
      );
    }

    return (
      <div>
        {truncate(children, {
          wordCount,
          moreElem: this.renderToggleButton(),
        })}
      </div>
    );
  }
}
