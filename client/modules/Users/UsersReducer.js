import {
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  ADD_USERS,
  SET_STATUS_TEXT
} from './UsersActions'

const initialState = {
  data: []
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
    case SET_STATUS_TEXT:
      return Object.assign({}, state, {
        statusText: action.statusText
      });
    default:
      return state;
  }
};

export function getUsers = state => state.users.data;

export function getStatusText = state => state.users.statusText;
