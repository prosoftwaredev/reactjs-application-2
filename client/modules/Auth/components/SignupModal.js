import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'

import { connect } from 'react-redux';
import { hideSignupModal, signup } from '../AuthActions';

export class SignupModal extends Component {

  hideModal = () => {
    this.props.dispatch(hideSignupModal());
  };

  signup = () => {
    const first_name = this.refs.first_name;
    const last_name = this.refs.last_name;
    const email = this.refs.email;
    const password = this.refs.password;
    this.props.dispatch(signup({
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
    }));
  };

  render() {
    return (
        <Modal
          show={ this.props.isShowModal }
          onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {
                    this.props.statusText != '' && <div className='alert alert-danger' role='alert'>{this.props.statusText}</div>
                  }
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
              </Modal.Body>
              <Modal.Footer>
                <div className='form-group text-right'>
                  <button onClick={this.signup} className='btn btn-primary'>Sign Up</button>
                </div>
              </Modal.Footer>
        </Modal>
    );
  }
}


function mapStateToProps(state) {
  return {
    isShowModal: state.auth.isShowSignupModal,
    statusText: state.auth.statusText
  };
}

export default connect(mapStateToProps)(SignupModal);
