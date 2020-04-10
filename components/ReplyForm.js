import React from 'react';
import {
  TYPE_NAME,
  TYPE_DESC,
  TYPE_INSTRUCTION,
  TYPE_SUGGESTION_OPTIONS,
} from '../constants/replyType';

import Link from 'next/link'

import { EDITOR_FACEBOOK_GROUP, EDITOR_REFERENCE } from '../constants/urls';
import i18n from '../i18n';

const localStorage = typeof window === 'undefined' ? {} : window.localStorage;
const formInitialState = {
  replyType: 'NOT_ARTICLE',
  reference: '',
  text: '',
};

export default class ReplyForm extends React.PureComponent {
  static defaultProps = {
    onSubmit() {
      return Promise.reject();
    },
    disabled: false,
  };

  constructor() {
    super();
    this.state = {
      ...formInitialState,
    };
  }

  componentDidMount() {
    const { replyType, reference, text } = this.state;

    // restore from localStorage if applicable.
    // We don't do this in constructor to avoid server/client render mismatch.
    //
    this.setState({
      replyType: localStorage.replyType || replyType,
      reference: localStorage.reference || reference,
      text: localStorage.text || text,
    });
  }

  set(key, value) {
    this.setState({ [key]: value });

    // Backup to localStorage
    requestAnimationFrame(() => (localStorage[key] = value));
  }

  handleTypeChange = ({ target: { value } }) => {
    this.set('replyType', value);
  };

  handleTextChange = ({ target: { value } }) => {
    this.set('text', value);
  };

  handleReferenceChange = ({ target: { value } }) => {
    this.set('reference', value);
  };

  handleSubmit = e => {
    e.preventDefault(); // prevent reload
    if (this.props.disabled) return;
    const { replyType, reference, text } = this.state;
    this.props.onSubmit({ type: replyType, reference, text }).then(() => {
      // Clean up localStorage on success
      delete localStorage.replyType;
      delete localStorage.reference;
      delete localStorage.text;

      this.setState(formInitialState);
    });
  };

  handleSuggestionAdd = e => {
    const result = [e.target.value];
    if (this.state.text) result.push(this.state.text);

    this.set('text', result.join('\n'));
    if (this._textEl) {
      this._textEl.focus();
    }
  };

  renderTypeSelect = () => {
    const { replyType } = this.state;
    return (
      <div className="form-inline mb-3">
        <div className="form-group">
          <select className="form-control" name="type" value={replyType} onChange={this.handleTypeChange}>
            {['NOT_RUMOR', 'RUMOR_NOT_RUMOR', 'RUMOR', 'NOT_ARTICLE', 'OPINIONATED'].map(type => (
              <option key={type} value={type}>
                {TYPE_NAME[type]}
              </option>
            ))}
          </select>
          <span className="ml-2 badge">{TYPE_DESC[replyType]}</span>
        </div>
        <style jsx>{`
          
          .badge {
            color: #252525;
            font-weight: 300;
            font-size: 0.95rem;
            padding: .5em .75em;
            background-color: #E9EDF0;
            border-radius: 15px;
          }
        `}</style>
      </div>
    );
  };

  renderSuggestions = () => {
    const { replyType } = this.state;
    if (!TYPE_SUGGESTION_OPTIONS[replyType]) return null;

    return (
      <p>
        {i18n.t("replyComponent.commonReplyTemplate")} ——&nbsp;
        {TYPE_SUGGESTION_OPTIONS[replyType].map(({ label, value }) => (
          <button
            key={label}
            className="suggestion"
            type="button"
            value={value}
            onClick={this.handleSuggestionAdd}
          >
            {label}
          </button>
        ))}
        <style jsx>{`
          .suggestion {
            background: transparent;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            margin: 0 8px 8px 0;
            font-size: 12px;
          }
        `}</style>
      </p>
    );
  };

  renderReferenceInput = () => {
    const { replyType, reference } = this.state;
    if (replyType === 'NOT_ARTICLE') {
      return (
        <p>
          {i18n.t("replyComponent.referToScope")}{' '}
          <Link href={`/editor/guideline`}>
            <a>
              {i18n.t("replyComponent.editingRules")}
            </a>
          </Link>
          {i18n.t("fullStop")}
        </p>
      );
    }

    return (
      <div className="form-group">
        <label htmlFor="reference">
          {replyType === 'OPINIONATED'
            ? `${i18n.t("sentence.referenceInput")}`
            : `${i18n.t("dataSource")} :`}
        </label>
        <br />
        <textarea
          required
          id="reference"
          className="form-control"
          placeholder={i18n.t('replyComponent.descriptionTextLink')}
          onChange={this.handleReferenceChange}
          value={reference}
        />
        <style jsx>{`
          textarea {
            width: 100%;
            height: 5em;
          }
          label {
            font-weight: bold;
          }
        `}</style>
      </div>
    );
  };

  renderHelp() {
    return (
      <span className="help">
        {EDITOR_REFERENCE?
        <>
          {i18n.t("replyComponent.formHelp")} <a
            href={EDITOR_REFERENCE}
            target="_blank"
            rel="noopener noreferrer"
          >
            {i18n.t("replyComponent.editingRules")}
          </a>
        </>
        : ``}

        {EDITOR_FACEBOOK_GROUP?
        <a
          href={EDITOR_FACEBOOK_GROUP}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook {i18n.t("replyComponent.facebookHelp")}
        </a>
        : ``}
        {i18n.t("welcome")} :)
        <style jsx>{`
          .help {
            font-size: 12px;
            font-style: italic;
            display: inline-block;
            color: #999;
            margin-left: 5px;
          }
        `}</style>
      </span>
    );
  }

  render() {
    const { replyType, text } = this.state;
    const { disabled } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderTypeSelect()}

        <div className="form-group">
          <label htmlFor="text">{TYPE_INSTRUCTION[replyType]}</label>
          <br />
          {this.renderSuggestions()}
          <textarea
            required
            ref={el => (this._textEl = el)}
            id="text"
            className="form-control"
            placeholder={i18n.t("replyComponent.countWord")}
            onChange={this.handleTextChange}
            value={text}
          />
        </div>

        {this.renderReferenceInput()}

        <button className="btn btn-primary btn-md" type="submit" disabled={disabled}>
          {i18n.t("replyComponent.submitButton")}
        </button>

        {this.renderHelp()}

        <style jsx>{`
          textarea {
            width: 100%;
            height: 5em;
          }
          .suggestion {
            background: transparent;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 8px;
            margin: 0 8px 8px 0;
            font-size: 12px;
          }
          .submit {
            margin-right: 16px;
          }
          label {
            font-weight: bold;
          }
        `}</style>
      </form>
    );
  }
}
