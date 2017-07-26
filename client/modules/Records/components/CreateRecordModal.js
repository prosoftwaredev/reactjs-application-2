import React, { Component, PropTypes } from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import { createRecord } from '../RecordsActions';
import { connect } from 'react-redux';

export class CreateRecordModal extends Component {

  createRecord = () => {
    var record = this.refs;
    for (var image in this.state) {
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
                      if (name != '_id')
                        return (
                          <div key={field._id}>
                          { 
                            field.type !='bool' &&
                            <div className='form-group'>
                              <label htmlFor={`#${name}`}>{field.name}</label> 
                              { field.type == 'text' && <input type='text' id={name} ref={name} className='form-control' /> }
                              
                              { field.type == 'image' && <input type='file' id={name} className='form-control' onChange={this.changeImage(name).bind(this)}/> }
                            </div> 
                          }
                          {
                            field.type == 'bool' &&
                            <div className='checkbox'>
                              <label htmlFor={`#${name}`}>
                                <input type='checkbox' id={name} ref={name}/>
                                {field.name}
                              </label>

                            </div>
                          }
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
