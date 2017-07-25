import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import { updateRecord } from '../RecordsActions';
import { connect } from 'react-redux';

export class EditRecordModal extends Component {

  constructor(props) {
    super(props);
    this.state = this.props.record;
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState(nextProps.record);
    }
  }

  changeText = (key) => (event) => {
    var object = {};
    object[key] = event.target.value;
    this.setState(object);
  }

  changeCheck = (key) => (event) => {
    var object = {};
    object[key] = event.target.checked;
    this.setState(object);
  }

  changeImage  = (image_name) => (e) => {
    var image = {};
    image[image_name] = e.target.files[0];
    this.setState(image);
  }

  updateRecord = () => {
      var record = this.state;
      this.props.dispatch(updateRecord(record));
      this.props.hideModal();
  }

  render() {
    return (
      <Modal
        show={ this.props.isShow }
        onHide={ this.props.hideModal }>
            <Modal.Header closeButton>
              <Modal.Title>Edit Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                this.props.fields.map(field => {
                  var name = field.name.replace(' ', '_');
                  return (
                    <div className='form-group'>
                      <label htmlFor={`#${name}`}>field.name</label>
                      { field.type == 'text' && <input type='text' id={name} ref={name} className='form-control' onChange={this.changeText(name).bind(this)} value={this.state[name]} /> }
                      { field.type == 'bool' && <input type='checkbox' id={name} ref={name} className='form-control' onChange={this.changeCheck(name).bind(this)} checked={this.state[name]}/> }
                      { field.type == 'image' && <input type='file' id={name} className='form-control' onChange={this.changeImage(name).bind(this)} /> }
                    </div>
                )
              })
            }
            </Modal.Body>
            <Modal.Footer>
              <div className='form-group text-right'>
                <button onClick={this.updateRecord} className='btn btn-primary'>Update</button>
              </div>
            </Modal.Footer>
      </Modal>
    );
  }
}

EditRecordModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  record: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired
};

export default connect()(EditRecordModal);
