/**
 *
 * @param {*} response
 * @return {*} response
 */
export async function handleResponse(response) {
  console.log(response);
  if (response.status === 200) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message,
    // so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  if (response.status === 401) {
    // try to get new token
    // if no token return error
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

/**
 * In a real app, would likely call an error logging service.
 * @param {*} error
 */
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error('API call failed. ' + error);
  throw error;
}
