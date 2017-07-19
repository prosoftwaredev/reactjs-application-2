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
          show={ this.props.isShowModal }
          onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div onBlur={this.hideModal}>
                  <div className='form-group'>
                    <label htmlFor='#first_name'>First Name</label>
                    <input type='text' id='first_name' ref='first_name' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#last_name'>Last Name</label>
                    <input type='text' id='last_name' ref='last_name' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#email'>Email</label>
                    <input type='text' id='email' ref='email' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#password'>Password</label>
                    <input type='password' id='password' ref='password' className='form-control'  />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <div className='form-group text-right'>
                  <button onClick={this.signup} className='btn btn-primary'>Sign Up</button>
                </div>
              </Modal.Footer>
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
