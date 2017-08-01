import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { updateField } from '../RecordsActions';
import { connect } from 'react-redux';

export class EditFieldModal extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.field;
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState(nextProps.field);
    }
  }

  changeName = (event) => {
    this.setState({name: event.target.value});
  }

  changeDescription = (event) => {
    this.setState({description: event.target.value});
  }

  changeType = (event) => {
    this.setState({type: event.target.value});
  }

  changeIsRequired = (event) => {
    this.setState({isRequired: event.target.checked});
  }

  updateField = () => {
      var field = this.state;
      if (this.refs.password.value != '') {
        field.password = this.refs.password.value;
      }
      this.props.dispatch(updateField(field));
      this.props.hideModal();
  }

  render() {
    return (
      <Modal
        show={ this.props.isShow }
        onHide={ this.props.hideModal }>
            <Modal.Header closeButton>
              <Modal.Title>Edit Field</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='form-group'>
                    <label htmlFor='#name'>Name</label>
                    <input type='text' id='name' onChange={this.changeName.bind(this)} className='form-control' value={this.state.name}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='#description'>Description</label>
                    <input type='text' id='description'  onChange={this.changeDescription.bind(this)} className='form-control' value={this.state.description}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='#type'>Type</label>
                    <select className='form-control' defaultValue={this.state.type} onChange={this.changeType.bind(this)}>
                      <option value="text">Text</option>
                      <option value="bool">Checkbox</option>
                      <option value="image">Image</option>
                    </select>
                </div>
                <div className='checkbox'>
                  <label htmlFor='#isRequired'> 
                    Required 
                    <input type='checkbox' id='isRequired' onChange={this.changeIsRequired.bind(this)} className='form-control' checked={this.state.isRequired}/>
                  </label>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <div className='form-group text-right'>
                <button onClick={this.updateField} className='btn btn-primary'>Update</button>
              </div>
            </Modal.Footer>
      </Modal>
    );
  }
}

EditFieldModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
};

export default connect()(EditFieldModal);
