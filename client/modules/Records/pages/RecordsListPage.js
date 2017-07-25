import React, { PropTypes, Component } from 'react';
import { fetchRecords, fetchFields } from '../RecordsActions';
import { getRecords, getStatusText, getFields } from '../RecordsReducer';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';
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
      <img src={cell} width={100} height={100} />
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

  render() {
    const options = {
      insertBtn: this.createRecordButton
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
          >
          {
            this.props.fields.map(field => {
              if (field.type = 'bool') {
                  return (
                    <TableHeaderColumn
                      dataField={field.name.replace(' ', '_')}
                      dataFormatter={activeFormatter}>
                        {field.name}
                      </TableHeaderColumn>
                  );
              }
              if (record.type = 'image') {
                return (
                  <TableHeaderColumn
                    dataField={field.name.replace(' ', '_')}
                    dataFormatter={imageFormatter}>
                      {field.name}
                    </TableHeaderColumn>
                  );
              }
              return (
                <TableHeaderColumn
                  dataField={field.name.replace(' ', '_')}
                  dataSort>
                  {field.name}
                </TableHeaderColumn>
              );
            })
          }
          <TableHeaderColumn
            dataField='id'
            isKey
            dataFormat={ this.editRecord } />
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
  fields: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
    isRequired: PropTypes.bool.isRequired
  })),
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
