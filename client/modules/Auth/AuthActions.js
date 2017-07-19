// Export Constants
import callApi from '../../util/apiCaller';

export const LOGGED_IN = 'LOGGED_IN';
export const SHOW_SIGNUP_MODAL = 'SHOW_SIGNUP_MODAL';
export const HIDE_SIGNUP_MODAL = 'HIDE_SIGNUP_MODAL';
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const HIDE_LOGIN_MODAL = 'HIDE_LOGIN_MODAL';

export function login(user) {
  return (dispatch) => {
    return callApi('login', 'post', {
        user: {
          email: user.email,
          passsword: user.password
        },
      }).then(res => dispatch(loggedIn({ email: res.email, token: res.token })));
  };
}

export function signup(user) {
  return (dispatch) => {
    return callApi('signup', 'post', {
        user: {
          email: user.email,
          passsword: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      }).then(res => dispatch(hideSignupModal()));
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
