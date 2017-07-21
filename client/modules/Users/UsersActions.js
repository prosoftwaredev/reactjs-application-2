// Export Constants
import callApi from '../../util/apiCaller';

export const ADD_USER = 'ADD_USER';
export const ADD_USERS = 'ADD_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SHOW_CREATE_USER_MODAL = 'SHOW_CREATE_USER_MODAL';
export const SHOW_EDIT_USER_MODAL = 'SHOW_EDIT_USER_MODAL';
export const HIDE_CREATE_USER_MODAL = 'HIDE_CREATE_USER_MODAL';
export const HIDE_EDIT_USER_MODAL = 'HIDE_EDIT_USER_MODAL';

export function fetchUsers(token) {
  return (dispatch) => {
    return callApi('users', 'get', {}, token).then(res => {
        dispatch(addUsers(res.users));
    });
  };
}

export function addUsers(users) {
  return {
    type: ADD_USERS,
    users
  }
}

