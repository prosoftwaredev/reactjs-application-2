import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { createUser } from '../UsersActions';
import { connect } from 'react-redux';

export class CreateUserModal extends Component {

  createUser = () => {
    const first_name = this.refs.first_name;
    const last_name = this.refs.last_name;
    const email = this.refs.email;
    const password = this.refs.password;
    const admin = this.refs.admin;
    this.props.dispatch(createUser({
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      password: password.value,
      admin: admin.checked
    }));
    this.props.hideModal();
  };

  render() {
    return (
        <Modal
          show={ this.props.isShow }
          onHide={this.props.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
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
                    <input type='password' id='password' ref='password' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#admin'> Admin </label>
                    <input type='checkbox' id='admin' ref='admin' className='form-control' />
                  </div>
              </Modal.Body>
              <Modal.Footer>
                <div className='form-group text-right'>
                  <button onClick={this.createUser} className='btn btn-primary'>Create</button>
                </div>
              </Modal.Footer>
        </Modal>
    );
  }
}

CreateUserModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default connect()(CreateUserModal);
