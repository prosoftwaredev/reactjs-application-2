import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  SHOW_CREATE_USER_MODAL,
  SHOW_EDIT_USER_MODAL,
  HIDE_CREATE_USER_MODAL,
  HIDE_EDIT_USER_MODAL,
} from './UsersActions'

const initialState = {
  data: []
  isShowCreateUserModal: false,
  isShowEditUserModal: false,
  statusText: ''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return Object.assign({}, state, {
        users: action.users
      })
    case ADD_USER:
      return Object.assign({}, state, {
        users: [action.user, ...state.data],
      };
    case DELETE_USER:
      return Object.assign({}, state, {
        users: state.data.filter(user => user.id !== action.uid),
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        users: state.data.map(user => {
          if (user.id === action.user.id) return action.user;
          return user;
        })
      })
    case SHOW_CREATE_USER_MODAL:
      return Object.assign({}, state, {
        isShowCreateUserModal: true
      });
    case SHOW_EDIT_USER_MODAL:
      return Object.assign({}, state, {
        isShowEditUserModal: true,
      });
    case HIDE_CREATE_USER_MODAL:
      return Object.assign({}, state, {
        isShowCreateUserModal: false,
        statusText: ''
      });
    case HIDE_EDIT_USER_MODAL:
      return Object.assign({}, state, {
        isShowEditUserModal: false,
        statusText: ''
      });
    case SET_STATUS_TEXT:
      return Object.assign({}, state, {
        statusText: action.statusText
      });
    default:
      return state;
  }
};

export function getUsers = state => state.users.data
