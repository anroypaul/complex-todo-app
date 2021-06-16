import request from './request';
import {handleResponse, handleError} from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/categories';

/**
 *
 * @return {*}
 */
export function getCategoriesForCurrentUser() {
  return request({url: `${baseUrl}/current`})
    .then(handleResponse)
    .catch(handleError);
}

/**
 * @param {*} category
 * @return {*}
 */
export function getTodosByCategory(category) {
  return request({
    url: `${baseUrl}/${category.id}/todos`,
  })
    .then(handleResponse)
    .catch(handleError);
}

/**
 *
 * @param {*} category
 * @return {Promise} axios
 */
export function save(category) {
  return request({
    url: baseUrl + '/' + (category.id || ''),
    // POST for create, PUT to update when id already exists.
    method: category.id ? 'PUT' : 'POST',
    data: category,
  })
    .then(handleResponse)
    .catch(handleError);
}
