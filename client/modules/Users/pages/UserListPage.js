import React, { PropTypes, Component } from 'react';
import { fetchUsers } from '../UsersActions';
import { getUsers, getStatusText } from '../UsersReducer';
import { getToken } from '../../Auth/AuthReducer';
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';
import CreateUserModal from '../components/CreateUserModal';
import EditUserModal from '../components/EditUserModal';


class ActiveFormatter extends React.Component {
  render() {
    return (
      <input type='checkbox' checked={ this.props.admin }/>
    );
  }
}

function activeFormatter(cell, row) {
  return (
    <ActiveFormatter admin={ cell } />
  );
}

class UserListPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  handleRowSelect(row, isSelected, e) {
    if (isSelected) {
      this.setState({ user: row, isShowEditUserModal: true });
    }
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
        btnGlyphicon='glyphicon-edit'
        onClick={ () => this.handleCreateButtonClick(onClick) }/>
    );
  }

  render() {
    const selectRow = {
      mode: 'radio',  // multi select
      onSelect: this.handleRowSelect
    };
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
          options=options
          insertRow
          selectRow={ selectRow }
          >
          <TableHeaderColumn
            dataField='id'
            isKey
            hidden >
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField='first_name'
            caretRender={getCaret}
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
        </BootstrapTable>
        <CreateUserModal
          isShow={this.props.isShowCreateUserModal}
          hideModal={this.hideCreateModal}
          token={this.props.token}/>
        <EditUserModal
          user={this.props.user}
          isShow={this.props.isShowEditUserModal}
          hideModal={this.hideEditModal}
          token={this.props.token}/>
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserListPage.need = [() => { return fetchUsers(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    users: getUsers(state),
    token: getToken(state),
    statusText: getStatusText(state)
  };
}

UserListPage.defaultProps = {
  isShowCreateUserModal: false,
  isShowEditUserModal: false,
  user: {}
}

UserListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    admin: PropTypes.bool.isRequired,
  })).isRequired,
  token: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

UserListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserListPage);
