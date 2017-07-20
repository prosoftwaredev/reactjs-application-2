import {
  LOGGED_IN,
  SHOW_SIGNUP_MODAL,
  HIDE_SIGNUP_MODAL,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  SET_STATUS_TEXT }
  from './AuthActions'

const initialState = {
  isAuthenticated: false,
  user: null,
  isShowLoginModal: false,
  isShowSignupModal: false,
  statusText: ''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN :
      return Object.assign({}, state, {
        isAuthenticated: true,
        isShowLoginModal: false,
        user: action.user
      });
    case SHOW_SIGNUP_MODAL:
      return Object.assign({}, state, {
        isShowSignupModal: true,
      });
    case HIDE_SIGNUP_MODAL:
      return Object.assign({}, state, {
        isShowSignupModal: false,
        statusText: ''
      });
    case SHOW_LOGIN_MODAL:
      return Object.assign({}, state, {
        isShowLoginModal: true,
      });
    case HIDE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isShowLoginModal: false,
        statusText: ''
      });
    case SET_STATUS_TEXT:
      return Object.assign({}, state, {
        statusText: action.statusText
      })
    default:
      return state;
  }
};

export const isShowLoginModal = state => state.auth.isShowLoginModal;

export const isShowSignupModal = state => state.auth.isShowSignupModal;

export const isAuthenticated = state => state.auth.isAuthenticated;

export default AuthReducer;
