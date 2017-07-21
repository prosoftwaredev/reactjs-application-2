import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { updateUser } from '../UsersActions';
import { connect } from 'react-redux';

export class EditUserModal extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.user;
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState(nextProps.user);
    }
  }

  changeFirstName = (event) => {
    this.setState({first_name: event.target.value});
  }

  changeLastName = (event) => {
    this.setState({last_name: event.target.value});
  }

  changeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  changeAdmin = (event) => {
    this.setState({admin: event.target.checked});
  }

  updateUser = () => {
      var user = this.state;
      if (this.refs.password.value != '') {
        user.password = this.refs.password.value;
      }
      this.props.dispatch(updateUser(user));
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
                    <input type='text' id='first_name' onChange={this.changeFirstName.bind(this)} className='form-control' value={this.state.first_name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='#last_name'>Last Name</label>
                    <input type='text' id='last_name'  onChange={this.changeFirstName.bind(this)} className='form-control' value={this.state.last_name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='#email'>Email</label>
                    <input type='text' id='email'  onChange={this.changeFirstName.bind(this)} className='form-control' value={this.state.email} />
                </div>
                <div className='form-group'>
                    <label htmlFor='#password'>Password</label>
                    <input type='password' id='password' ref='password' className='form-control'  />
                </div>
                <div className='form-group'>
                  <label htmlFor='#admin'> Admin </label>
                  <input type='checkbox' id='admin' onChange={this.changeAdmin.bind(this)} className='form-control' checked={this.state.admin}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <div className='form-group text-right'>
                <button onClick={this.updateUser} className='btn btn-primary'>Update</button>
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
};

export default connect()(EditUserModal);
