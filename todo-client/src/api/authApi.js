import axios from 'axios';
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

// function refreshToken() {
//   return fetch(baseUrl + "refresh", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       "x-access-token": localStorage.getItem("accessToken"),
//     },
//   })
//     .then(handleResponse)
//     .catch(handleError);
// }

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      if (
        err.response.status === 401 &&
        err.config &&
        !err.config.__isRetryRequest
      ) {
        originalReq._retry = true;

        const res = fetch(`${baseUrl}refresh`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            Device: 'device',
            'x-access-token': localStorage.getItem('accessToken'),
            'x-refresh-token': localStorage.getItem('refreshToken'),
          },
          redirect: 'follow',
          referrer: 'no-referrer',
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);

            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);

            originalReq.headers['x-access-token'] = res.accessToken;
            originalReq.headers['Device'] = 'device';

            return axios(originalReq);
          })
          .catch((error) => {
            console.log(error);
            if (res.accessToken === undefined) {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              reject(new Error(error));
            }
          });

        resolve(res);
      }

      return Promise.reject(err);
    });
  },
);
