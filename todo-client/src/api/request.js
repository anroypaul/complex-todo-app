import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import * as authApi from './authApi';
import * as apiUtils from './apiUtils';

/**
 * For secured API requests
 */
const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

/**
 * Interceptor for update headers after token refresh
 */
request.interceptors.request.use(
  (config) => {
    const token = apiUtils.getAccessToken();
    const refreshToken = apiUtils.getRefreshToken();
    if (token && refreshToken) {
      config.headers['x-access-token'] = token;
      config.headers['x-refresh-token'] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const refreshAuthLogic = (failedRequest) =>
  authApi.refreshToken().then((response) => {
    apiUtils.setAccessToken(response.accessToken);
    apiUtils.setRefreshToken(response.refreshToken);

    failedRequest.response.config.headers['x-access-token'] =
      response.accessToken;
    failedRequest.response.config.headers['x-refresh-token'] =
      response.refreshToken;

    return Promise.resolve();
  });

// Instantiate the interceptor (you can chain it as it returns the axios instance)
createAuthRefreshInterceptor(request, refreshAuthLogic);

export default request;
