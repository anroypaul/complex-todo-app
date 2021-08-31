import request from './request';
import {handleResponse, handleError} from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/todos';

/**
 * @param {string|number} category
 * @param {number} page
 * @param {number} size
 *
 * @return {*}
 */
export function getTodos(category, page = 1, size = 10) {
  return request({
    url: baseUrl,
    params: {
      category,
      page,
      size,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 *
 * @param {*} todo
 * @return {Promise} axios
 */
export function saveTodo(todo) {
  return request({
    url: baseUrl + '/' + (todo.id || ''),
    // POST for create, PUT to update when id already exists.
    method: todo.id ? 'PUT' : 'POST',
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
  return request({url: `${baseUrl}/${todoId}`, method: 'DELETE'})
    .then(handleResponse)
    .catch(handleError);
}
