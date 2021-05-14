import axios from 'axios';
import * as apiUtils from './apiUtils.js';
import {handleResponse, handleError} from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/auth/';
const headers = {'content-type': 'application/json'};

/**
 *
 * @param {*} username
 * @param {*} password
 * @return {Promise}
 */
export function signIn(username, password) {
  return axios({
    url: baseUrl + 'login',
    method: 'POST', // POST for create, PUT to update when id already exists.
    data: JSON.stringify({username, password}),
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 *
 * @param {*} username
 * @param {*} password
 * @return {Promise}
 */
export function signUp(username, password) {
  return axios({
    url: baseUrl + 'signup',
    method: 'POST', // POST for create, PUT to update when id already exists.
    data: JSON.stringify({username, password}),
    headers,
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 *
 * @return {Promise}
 */
export function refreshToken() {
  return axios({
    url: baseUrl + 'refresh',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-access-token': apiUtils.getAccessToken(),
      'x-refresh-token': apiUtils.getRefreshToken(),
    },
  })
    .then(handleResponse)
    .catch(handleError);
}
