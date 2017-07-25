import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { createRecord } from '../RecordsActions';
import { connect } from 'react-redux';

export class CreateRecordModal extends Component {

  createRecord = () => {
    var record = this.refs;
    for (image in this.state) {
      record[image] = this.state[image];
    }
    this.props.dispatch(createRecord(record));
    this.props.hideModal();
  };

  changeImage  = (image_name) => (e) => {
    var image = {};
    image[image_name] = e.target.files[0];
    this.setState(image);
  }

  render() {
    return (
        <Modal
          show={ this.props.isShow }
          onHide={this.props.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create Record</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  {
                    this.props.fields.map(field => {
                      const name = field.name.replace(' ', '_');
                      return (
                        <div className='form-group' key={field._id}>
                          <label htmlFor={`#${name}`}>{field.name}</label>
                          { field.type == 'text' && <input type='text' id={name} ref={name} className='form-control' /> }
                          { field.type == 'bool' && <input type='checkbox' id={name} ref={name} className='form-control' /> }
                          { field.type == 'image' && <input type='file' id={name} className='form-control' onChange={this.changeImage(name).bind(this)}/> }
                        </div>
                      )
                    })
                  }
              </Modal.Body>
              <Modal.Footer>
                <div className='form-group text-right'>
                  <button onClick={this.createRecord} className='btn btn-primary'>Create</button>
                </div>
              </Modal.Footer>
        </Modal>
    );
  }
}

CreateRecordModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
};

export default connect()(CreateRecordModal);
