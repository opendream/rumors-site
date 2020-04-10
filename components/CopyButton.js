import React from 'react';
import ClipboardJS from 'clipboard';
import 'balloon-css/balloon.css';
import i18n from '../i18n';

export default class CopyButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.copyBtnRef = React.createRef();
  }

  static defaultProps = {
    content: '',
  };
  state = {
    tooltipAttrs: {},
  };

  componentDidMount() {
    const clipboard = new ClipboardJS(this.copyBtnRef.current, {
      text: () => this.props.content,
    });
    clipboard.on('success', () => {
      const self = this;
      this.setState({
        tooltipAttrs: {
          'data-balloon': `${i18n.t("copied")}!`,
          'data-balloon-visible': '',
          'data-balloon-pos': 'up',
        },
      });

      setTimeout(function() {
        self.setState({ tooltipAttrs: {} });
      }, 1000);
    });
  }

  render() {
    const { tooltipAttrs } = this.state;
    return (
      <button ref={this.copyBtnRef} className="btn-copy btn-secondary btn-sm" {...tooltipAttrs}>
        {i18n.t('copyToClipboard')}
        <style jsx>{`
          .btn-copy {
            margin-left: 10px;
          }
        `}</style>
      </button>
    );
  }
}
