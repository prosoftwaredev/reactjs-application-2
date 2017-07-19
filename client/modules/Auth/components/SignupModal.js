import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'

import { connect } from 'react-redux';
import { hideSignupModal, signup } from '../AuthActions';

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

  render() {
    return (
      <div>
        <Modal
          show={ this.props.isShowModal } onHide={this.hideModal}>
              <Modal.Header>
                <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div onBlur={this.hideModal}>
                  <input type='text' name='first_name' ref='first_name' />
                  <input type='text' name='last_name' ref='last_name' />
                  <input type='text' name='email' ref='email' />
                  <input type='password' name='password' ref='password' />
                  <a href='javascript:void(0);' onClick={this.signup} >Sign Up</a>
                </div>
              </Modal.Body>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    isShowModal: state.auth.isShowSignupModal
  };
}

export default connect(mapStateToProps)(SignupModal);
