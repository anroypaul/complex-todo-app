import request from './request';
import {handleResponse, handleError} from './apiUtils';

const baseUrl = process.env.REACT_APP_API_URL + '/categories/';

/**
 *
 * @return {*}
 */
export function getCategoriesForCurrentUser() {
  return request({url: `${baseUrl}current`})
    .then(handleResponse)
    .catch(handleError);
}
