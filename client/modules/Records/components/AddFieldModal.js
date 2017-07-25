import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { createField } from '../RecordsActions';
import { connect } from 'react-redux';

export class CreateFieldModal extends Component {

  getInitialState = () => {
    return {type:'text'};
  };

  handleChange = (e) => {
    this.setState({ type:e.target.value });
  };

  createField = () => {
    const name = this.refs.name;
    const description = this.refs.description;
    const isRequired = this.refs.isRequired;
    this.props.dispatch(createField({
      name: name.value,
      type: this.state.type,
      description: description.value,
      isRequired: isRequired.checked
    }));
    this.props.hideModal();
  };

  render() {
    return (
        <Modal
          show={ this.props.isShow }
          onHide={this.props.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create Field</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <div className='form-group'>
                    <label htmlFor='#name'>Name</label>
                    <input type='text' id='name' ref='name' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#last_name'>Last Name</label>
                    <input type='text' id='last_name' ref='last_name' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#type'>Type</label>
                    <select className='form-control' defaultValue={this.state.type} onChange={this.handleChange}>
                      <option value="text">Text</option>
                      <option value="bool">Checkbox</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#description'>Description</label>
                    <input type='description' id='description' ref='description' className='form-control' />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='#isRequired'> Required </label>
                    <input type='checkbox' id='isRequired' ref='isRequired' className='form-control' />
                  </div>
              </Modal.Body>
              <Modal.Footer>
                <div className='form-group text-right'>
                  <button onClick={this.createField} className='btn btn-primary'>Create</button>
                </div>
              </Modal.Footer>
        </Modal>
    );
  }
}

CreateFieldModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default connect()(CreateFieldModal);
