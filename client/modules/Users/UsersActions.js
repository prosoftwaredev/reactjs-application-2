// Export Constants
import callApi from '../../util/apiCaller';

export const ADD_USER = 'ADD_USER';
export const ADD_USERS = 'ADD_USERS';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_STATUS_TEXT = 'SET_STATUS_TEXT';

export function fetchUsers() {
  console.log('asfasdf');
  return (dispatch) => {
    return callApi('users/').then(res => {
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

export function updateUser(user) {
  return (dispatch) => {
    return callApi('users/update', 'put', user).then(res => {
      if (res.error) {
        dispatch(setStatusText(res.error));
      }
      else dispatch(modifyUser(res.user));
    })
  }
}

export function modifyUser(user) {
  return {
    type: UPDATE_USER,
    user
  }
}

export function createUser(user) {
  return (dispatch) => {
    return callApi('users/add', 'post', user).then(res => {
        if (res.error) {
            dispatch(setStatusText(res.error));
        }
        else dispatch(addUser(res.user));
    })
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    user
  }
}

export function setStatusText(text) {
  return {
    type: SET_STATUS_TEXT,
    statusText: text
  }
}

