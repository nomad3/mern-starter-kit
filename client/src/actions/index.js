//=================
// IMPORT
//=================
import axios from 'axios';
import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { AUTH_USER,
         ERROR_RESPONSE,
         UNAUTH_USER,
         FORGOT_PASSWORD_REQUEST,
         RESET_PASSWORD_REQUEST,
         CLEAR_ERRORS
 } from './types';

// server route
const API_URL = 'http://localhost:3000/api';
const ROOT_URL = 'http://localhost:8080';

//================================
// UTILITY ACTIONS
//================================

export function errorHandler(error) {
  return {
    type: ERROR_RESPONSE,
    payload: error
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  };
}

export function unauthError(response) {
  if (response.status === 401) {
    return logoutUser('Your session has expired. Please login again.');
  }

  return errorHandler(response.data);
}

export function invalidLogin(response) {
  if (response.status === 401) {
    return {
      type: ERROR_RESPONSE,
      payload: "You entered incorrect information!"
    };
  } else if (response.status === 400) {
      return {
        type: ERROR_RESPONSE,
        payload: "Please enter both your email and password."
      };
  }
}

//================================
// AUTHENTICATION ACTIONS
//================================

// login a user
export function loginUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href= ROOT_URL+"/dashboard";
    })
    .catch(response => dispatch(invalidLogin(response)));
    }
  }

//register user
export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      cookie.save('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href= ROOT_URL+"/dashboard";
    })
    .catch(response => dispatch(errorHandler(response.data.error)))
  }
}

//logout user
export function logoutUser(error) {
  cookie.remove('token', { path: '/' });
  cookie.remove('user', { path: '/' });

  errorHandler(error);
  window.location.href= ROOT_URL+"/login";

  return({ type: UNAUTH_USER });
}

//forgot password
export function getForgotPasswordToken({ email }) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/forgotpassword`, { email })
    .then(response => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: response.data.message
      });
    })
    .catch(response => dispatch(errorHandler(response.data.error)))
  }
}

//reset password
export function resetPassword( token,  {password} ) {
  return function(dispatch) {
    axios.post(`${API_URL}/auth/resetpassword/${token}`, { password })
    .then(response => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: response.data.message
      });
      // Redirect to login page on successful password reset
      browserHistory.push('/login');
    })
    .catch(response => dispatch(errorHandler(response.data.error)))
  }
}
