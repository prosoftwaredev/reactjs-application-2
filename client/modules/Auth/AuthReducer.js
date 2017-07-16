import { LOGGED_IN } from './AuthReducer'

const initialState = {
  isAuthenticated: false,
  user: null,
  isShowLoginModal: false,
  isShowSignUpModal: false
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
      });
    case SHOW_LOGIN_MODAL:
      return Object.assign({}, state, {
        isShowLoginModal: true,
      });
    case HIDE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isShowLoginModal: false,
      });
    default:
      return state;
  }
};

export isShowLoginModal = state => state.isShowLoginModal;

export isShowSignUpModal = state => state.isShowSignUpModal;
