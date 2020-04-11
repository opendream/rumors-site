import React, { PureComponent } from 'react';

export default class Modal extends PureComponent {
  render() {
    const { children, style = {}, onClose = () => {} } = this.props;
    return (
      <div className="root">
        <div className="">
          <div className="backdrop">
          </div>

          <div className="modal fade d-block show">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-body">
                  <button type="button" className="close" onClick={onClose}>
                    <span>&times;</span>
                  </button>
                  {children}
                </div>
              </div>
            </div>  
          </div>

        </div>

        <style jsx>{`
          .backdrop {
            position: fixed;
            background: rgba(0, 0, 0, 0.8);
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
          }
        `}</style>
      </div>
    );
  }
}
