import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux';

import { hideLoginModal } from '../AuthActions';
import { isShowLoginModal } from '../AuthReducer';

export class LoginModal extends Component {

  hideModal = () => {
    this.props.dispatch(hideLoginModal());
  };

  login = () => {
    email = this.ref.email;
    password = this.ref.password;
    this.props.dispatch(login({
      email: email,
      password: password,
    }));
  };

  render() {
    return (
      <Modal
        show={ this.props.isShowModal }
        aria-labelledby='contained-modal-title'>
            <Modal.Header>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div onBlur={this.hideModal}>
                <input type='text' name='first_name' ref='first_name' />
                <input type='text' name='last_name' ref='last_name' />
                <input type='text' name='email' ref='email' />
                <input type='password' name='password' ref='password' />
                <a href='javascript:void(0);' onClick={this.login} >Sign Up</a>
              </div>
            </Modal.Body>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isShowModal: isShowLoginModal(state)
  };
}

export default connect(mapStateToProps)(LoginModal);
