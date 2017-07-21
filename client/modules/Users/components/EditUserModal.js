import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { updateUser } from '../UsersActions';

export class EditUserModal extends Component {

  updateUser = () => {
      const first_name = this.refs.first_name;
      const last_name = this.refs.last_name;
      const email = this.refs.email;
      const password = this.refs.password;
      const admin= this.refs.admin;
      this.props.dispatch(updateUser({
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        password: password.value,
        admin: admin.checked
      }), token);
      this.props.hideModal();
  }

  render() {
    return (
      <Modal
        show={ this.props.isShow }
        onHide={ this.props.hideModal }>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form-group'>
                    <label htmlFor='#first_name'>First Name</label>
                    <input type='text' id='first_name' ref='first_name' className='form-control' value={this.props.user.first_name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='#last_name'>Last Name</label>
                    <input type='text' id='last_name' ref='last_name' className='form-control' value={this.props.user.last_name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='#email'>Email</label>
                    <input type='text' id='email' ref='email' className='form-control' value={this.props.user.email} />
                </div>
                <div className='form-group'>
                    <label htmlFor='#password'>Password</label>
                    <input type='password' id='password' ref='password' className='form-control'  />
                </div>
                <div className='form-group'>
                  <label htmlFor='#admin'> Admin </label>
                  <input type='checkbox' id='admin' ref='admin' className='form-control' checked={this.props.user.admin}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <div className='form-group text-right'>
                <button onClick={this.updateUser} className='btn btn-primary'>Login</button>
              </div>
            </Modal.Footer>
      </Modal>
    );
  }
}

EditUserModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired
};

export default EditUserModal;
