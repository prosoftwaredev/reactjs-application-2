import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { connect } from 'react-redux';

import { hideLoginModal, login } from '../AuthActions';

export class LoginModal extends Component {

  hideModal = () => {
    this.props.dispatch(hideLoginModal());
  };

  login = () => {
    var email = this.refs.email;
    var password = this.refs.password;
    this.props.dispatch(login({
      email: email.value,
      password: password.value,
    }));
  };

  render() {
    return (
      <Modal
        show={ this.props.isShowModal }
        onHide={ this.hideModal }>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form-group'>
                    <label htmlFor='#email'>Email</label>
                    <input type='text' id='email' ref='email' className='form-control'  />
                </div>
                <div className='form-group'>
                    <label htmlFor='#password'>Password</label>
                    <input type='password' id='password' ref='password' className='form-control'  />
                </div>
            </Modal.Body>
            <Modal.Footer>
              <div className='form-group text-right'>
                <button onClick={this.login} className='btn btn-primary'>Login</button>
              </div>
            </Modal.Footer>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isShowModal: state.auth.isShowLoginModal
  };
}

export default connect(mapStateToProps)(LoginModal);
