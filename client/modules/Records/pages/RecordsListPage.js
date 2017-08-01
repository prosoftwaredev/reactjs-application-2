import React, { PropTypes, Component } from 'react';
import { fetchRecords, fetchFields } from '../RecordsActions';
import { getRecords, getStatusText, getFields } from '../RecordsReducer';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import CreateRecordModal from '../components/CreateRecordModal';
import AddFieldModal from '../components/AddFieldModal';
import EditRecordModal from '../components/EditRecordModal';
import componentDispatch from '../../../components/ComponentDispatch'


class ActiveFormatter extends Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.cell } readOnly />
    );
  }
}

function activeFormatter(cell, row) {
  return (
    <ActiveFormatter cell={cell} />
  );
}

class ImageFormatter extends Component {
  render() {
    return (
      <img src={this.props.cell} width={30} height={30} />
    );
  }
}

function imageFormatter(cell, row) {
  return (
    <ImageFormatter cell={cell} />
  )
}

class RecordListPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShowCreateRecordModal: false,
      isShowEditRecordModal: false,
      record: {},
      isShowCreateFieldModal: false,
    };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
    this.addFieldModal = this.addFieldModal.bind(this);
    this.hideAddFieldModal = this.hideAddFieldModal.bind(this);
  }

  handleRowSelect = (record) => (e) => {
      this.setState({ record: record, isShowEditRecordModal: true });
  }

  handleCreateButtonClick = (onClick) => {
    this.setState({ isShowCreateRecordModal: true });
  }

  hideCreateModal = () => {
    this.setState({ isShowCreateRecordModal: false });
  }

  hideEditModal = () => {
    this.setState({ isShowEditRecordModal: false });
  }

  addFieldModal = () => {
    this.setState({ isShowCreateFieldModal: true });
  }

  hideAddFieldModal =() => {
    this.setState({ isShowCreateFieldModal: false });
  }

  createRecordButton = (onClick) => {
    return (
      <InsertButton
        btnText='Create Record'
        btnContextual='btn-warning'
        className='my-custom-class'
        btnGlyphicon='glyphicon-plus'
        onClick={ () => this.handleCreateButtonClick() }/>
    );
  }

  editRecord = (cell, row) => {
      return (
        <button onClick={this.handleRowSelect(row)} className='btn btn-default'>
          <span className="glyphicon glyphicon-pencil"></span>
        </button>
      )
  }

  handleDeleteButtonClick = (onClick) => {
    // Custom your onClick event here,
    // it's not necessary to implement this function if you have no any process before onClick
    onClick();
  }

  deleteRecordButton = (onClick) => {
    return (
      <DeleteButton
        btnText='Delete Record'
        btnContextual='btn-warning'
        className='my-custom-class'
        btnGlyphicon='glyphicon-trash'
        onClick={ () => this.handleDeleteButtonClick(onClick) }/>
    );
  }

  render() {  
    const options = {
      insertBtn: this.createRecordButton,
      noDataText: 'No Records!',
      deleteBtn: this.deleteRecordButton
    };
    const selectRow = {
      mode: 'radio', // or checkbox
      clickToSelect: true
    };
    return (
      <div>
        {
          this.props.statusText != '' && <div className='alert alert-danger' role='alert'>{this.props.statusText}</div>
        }
        <button className='btn btn-default' onClick={this.addFieldModal}> Add Field </button>
          <BootstrapTable
            data={this.props.records}
            hover
            striped
            multiColumnSort={8}
            search
            multiColumnSearch
            options={ options }
            insertRow
            deleteRow
            selectRow={ selectRow }
            keyField='_id'>
                {
                  this.props.fields.map(field => {
                    const name = field.name.replace(' ', '_');
                    if (field.type == 'bool') {
                      return (
                            <TableHeaderColumn
                              dataField={name}
                              dataFormat={activeFormatter}
                              key={field._id}>
                                {field.name}
                              </TableHeaderColumn>
                          );
                    }
                    else if (field.type == 'image') {
                      return (
                        <TableHeaderColumn
                          dataField={name}
                          dataFormat={imageFormatter}
                          key={field._id}>
                            {field.name}
                          </TableHeaderColumn>
                        );
                    }
                    else if (field.type == 'text') {
                      return (
                        <TableHeaderColumn
                          dataField={name}
                          dataSort
                          key={field._id}>
                          {field.name}
                        </TableHeaderColumn>
                      );
                  }
                  else 
                    return (
                        <TableHeaderColumn
                          dataField={name}
                          key={field._id}
                          dataFormat={this.editRecord}>
                          Edit Record
                        </TableHeaderColumn>
                      )
                  })
              }
          </BootstrapTable>
        <CreateRecordModal
          isShow={this.state.isShowCreateRecordModal}
          hideModal={this.hideCreateModal}
          fields={this.props.fields}/>
        <AddFieldModal
          isShow={this.state.isShowCreateFieldModal}
          hideModal={this.hideAddFieldModal}/>
        <EditRecordModal
          record={this.state.record}
          isShow={this.state.isShowEditRecordModal}
          hideModal={this.hideEditModal}
          fields={this.props.fields}/>
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    records: getRecords(state),
    fields: getFields(state),
    statusText: getStatusText(state)
  };
}

RecordListPage.propTypes = {
  records: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  statusText: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

RecordListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default componentDispatch({
    willMount: (props, dispatch) => {
      dispatch(fetchRecords());
      dispatch(fetchFields());
    }
})(connect(mapStateToProps)(RecordListPage));
