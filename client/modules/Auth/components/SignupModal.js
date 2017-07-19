import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'

import { connect } from 'react-redux';
import { hideSignupModal, signup } from '../AuthActions';
import { isShowSignupModal } from '../AuthReducer';

export class SignupModal extends Component {

  hideModal = () => {
    this.props.dispatch(hideSignupModal());
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

  render = () => {
    return (
      <Modal
        show={ this.props.isShowModal }
        aria-labelledby='contained-modal-title'>
            <Modal.Header>
              <Modal.title>Sign Up</Modal.title>
            </Modal.Header>
            <Modal.body>
              <div onBlur={this.hideModal}>
                <input type='text' name='first_name' ref='first_name' />
                <input type='text' name='last_name' ref='last_name' />
                <input type='text' name='email' ref='email' />
                <input type='password' name='password' ref='password' />
                <a href='javascript:void(0);' onClick={this.signup} >Sign Up</a>
              </div>
            </Modal.body>
    </Modal>
    );
  }
}

SignupModal.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isShowModal: isShowSignupModal(state)
  };
}

export default connect(mapStateToProps)(SignupModal);
