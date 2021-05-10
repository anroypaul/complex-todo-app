import axios from 'axios';
import {handleResponse, handleError} from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/todos/';
const headers = {
  'content-type': 'application/json',
  'x-access-token': localStorage.getItem('accessToken'),
  'x-refresh-token': localStorage.getItem('refreshItem'),
};

/**
 *
 * @return {*}
 */
export function getTodos() {
  return axios({url: baseUrl, headers}).then(handleResponse).catch(handleError);
}

/**
 *
 * @param {*} todo
 * @return {Promise} axios
 */
export function saveTodo(todo) {
  return axios({
    url: baseUrl + (todo._id || ''),
    // POST for create, PUT to update when id already exists.
    method: todo._id ? 'PUT' : 'POST',
    headers,
    data: todo,
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 *
 * @param {*} todoId
 * @return {Promise}
 */
export function deleteTodo(todoId) {
  return axios({url: baseUrl + todoId, method: 'DELETE', headers})
    .then(handleResponse)
    .catch(handleError);
}
