import React, { PropTypes, Component } from 'react';
import { fetchUsers } from '../UsersActions';
import { getUsers, getStatusText } from '../UsersReducer';
import { connect } from 'react-redux';
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';
import componentDispatch from '../../../components/ComponentDispatch'


class ActiveFormatter extends Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.admin } readOnly />
    );
  }
}

function activeFormatter(cell, row) {
  return (
    <ActiveFormatter admin={ cell } />
  );
}

class UserListPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      isShowCreateUserModal: false,
      isShowEditUserModal: false,
      user: {},
    };
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.hideCreateModal = this.hideCreateModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
  }

  handleRowSelect = (user) => (e) => {
      this.setState({ user: user, isShowEditUserModal: true });
  }

  handleCreateButtonClick = (onClick) => {
    this.setState({ isShowCreateUserModal: true });
  }

  hideCreateModal = () => {
    this.setState({ isShowCreateUserModal: false });
  }

  hideEditModal = () => {
    this.setState({ isShowEditUserModal: false });
  }

  createUserButton = (onClick) => {
    return (
      <InsertButton
        btnText='Create User'
        btnContextual='btn-warning'
        className='my-custom-class'
        btnGlyphicon='glyphicon-plus'
        onClick={ () => this.handleCreateButtonClick() }/>
    );
  }

  editUser = (cell, row) => {
      return (
        <button onClick={this.handleRowSelect(row)} className='btn btn-default'>
          <span className="glyphicon glyphicon-pencil"></span>
        </button>
      )
  }

  render() {
    const options = {
      insertBtn: this.createUserButton
    };
    return (
      <div>
        {
          this.props.statusText != '' && <div className='alert alert-danger' role='alert'>{this.props.statusText}</div>
        }
        <BootstrapTable
          data={this.props.users}
          hover
          striped
          multiColumnSort={8}
          search
          multiColumnSearch
          options={ options }
          insertRow
          >
          <TableHeaderColumn
            dataField='id'
            isKey
            hidden >
            Id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='first_name'
            dataSort >
              First Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='last_name'
            dataSort >
              Last Name
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='email'
            dataSort >
              Email
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='admin'
            dataFormat={ activeFormatter } >
              Admin
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='id'
            dataFormat={ this.editUser } />
        </BootstrapTable>
        <CreateUserModal
          isShow={this.state.isShowCreateUserModal}
          hideModal={this.hideCreateModal} />
        <EditUserModal
          user={this.state.user}
          isShow={this.state.isShowEditUserModal}
          hideModal={this.hideEditModal} />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
    statusText: getStatusText(state)
  };
}

UserListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  })).isRequired,
  statusText: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

UserListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default componentDispatch({
    willMount: (props, dispatch) => {
      dispatch(fetchUsers())
    }
})(connect(mapStateToProps)(UserListPage));
