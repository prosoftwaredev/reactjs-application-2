import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'

import { hideLoginModal } from '../AuthActions';
import { isShowLoginModal } from '../AuthReducer';

export class LoginModal extends Component {

  hideModal = () => {
    this.props.dispatch(hideLoginModal();
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
        show={ this.props.isShowLoginModal }
        aria-labelledby='contained-modal-title'>
            <Modal.Header>
              <Modal.title>Sign Up</Modal.title>
            </Modal.Header>
            <Modal.body>
              <div onBlur={this.props.hideModal}>
                <input type='text' name='first_name' ref='first_name'>
                <input type='text' name='last_name' ref='last_name'>
                <input type='text' name='email' ref='email'>
                <input type='password' name='password' ref='password'>
                <a href='javascript:void(0);' onClick={this.props.signup} >Sign Up</a>
              </div>
            </Modal.body>
    </Modal>
    );
  }
}

LoginModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isShowModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isShowModal: isShowLoginModal(state)
  };
}

export default connect(mapStateToProps)(LoginModal);
