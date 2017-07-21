import React, { PropTypes, Component } from 'react';
import fetchUsers from '../UsersActions'

// Import Components


class UserListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  handleDeleteUser = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deleteUserRequest(post));
    }
  };

  handleAddUser = (name, title, content) => {
    this.props.dispatch(toggleAddUser());
    this.props.dispatch(addUserRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <UserCreateWidget addUser={this.handleAddUser} showAddUser={this.props.showAddUser} />
        <UserList handleDeleteUser={this.handleDeleteUser} posts={this.props.posts} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
UserListPage.need = [() => { return fetchUsers(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddUser: getShowAddUser(state),
    posts: getUsers(state),
  };
}

UserListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddUser: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

UserListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(UserListPage);
