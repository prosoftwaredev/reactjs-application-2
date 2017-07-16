import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'

import { hideSignUpModal, signup } from '../AuthActions';
import { isShowSignUpModal } from '../AuthReducer';

export class SignUpModal extends Component {

  hideModal = () => {
    this.props.dispatch(hideSignUpModal();
  };

  signup = () => {
    first_name = this.ref.first_name;
    last_name = this.ref.last_name;
    email = this.ref.email;
    password = this.ref.password;
    this.props.dispatch(signup({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    }));
  };

  render() {
    return (
      <Modal
        show={ this.props.isShowSignUpModal }
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

SignUpModal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isShowModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isShowModal: isShowSignUpModal(state)
  };
}

export default connect(mapStateToProps)(SignUpModal);
