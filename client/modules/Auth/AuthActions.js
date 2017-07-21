// Export Constants
import callAuth from '../../util/authCaller';

export const LOGGED_IN = 'LOGGED_IN';
export const SHOW_SIGNUP_MODAL = 'SHOW_SIGNUP_MODAL';
export const HIDE_SIGNUP_MODAL = 'HIDE_SIGNUP_MODAL';
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';
export const SET_STATUS_TEXT = 'SET_STATUS_TEXT';

export function login(user) {
  return (dispatch) => {
    return callAuth('login', 'post', {
        email: user.email,
        password: user.password
      }).then(res => {
        if (res.user) {
          dispatch(loggedIn({ email: res.user, token: res.token, isAdmin: res.isAdmin }));
        }
        else {
          dispatch(setStatusText('Invalid email and password'));
        }
      });
  };
}

export function signup(user) {
  return (dispatch) => {
    return callAuth('signup', 'post', {
        user: {
          email: user.email,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      }).then((res) => {
        if (res.error) {
          dispatch(setStatusText(res.error));
        }
        else {
          dispatch(hideSignupModal());
          dispatch(showLoginModal());
        }
      });
  };
}

export function hideSignupModal() {
  return {
    type: HIDE_SIGNUP_MODAL
  }
}

export function showSignupModal() {
  return {
    type: SHOW_SIGNUP_MODAL
  }
}

export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL
  }
}

export function showLoginModal() {
  return {
    type: SHOW_LOGIN_MODAL
  }
}

export function loggedIn(user) {
  return {
    type: LOGGED_IN,
    user
  }
}

export function setStatusText(text) {
  return {
    type: SET_STATUS_TEXT,
    statusText: text
  }
}
