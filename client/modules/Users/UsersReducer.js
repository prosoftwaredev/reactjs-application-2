import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  ADD_USERS,
  SET_STATUS_TEXT
} from './UsersActions'

const initialState = {
  data: [],
  statusText: ''
};

const UsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USERS:
      return Object.assign({}, state, {
        data: action.users
      })
    case ADD_USER:
      return Object.assign({}, state, {
        data: [action.user, ...state.data],
      })
    case DELETE_USER:
      return Object.assign({}, state, {
        data: state.data.filter(user => user._id !== action.uid),
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        data: state.data.map(user => {
          if (user._id === action.user._id) return action.user;
          return user;
        })
      })
    case SET_STATUS_TEXT:
      return Object.assign({}, state, {
        statusText: action.statusText
      });
    default:
      return state;
  }
};

export const getUsers = state => state.users.data;

export const getStatusText = state => state.users.statusText;

export default UsersReducer;
