import * as types from './actionTypes';
import * as authApi from '../../api/authApi';
import * as apiUtils from '../../api/apiUtils';

// export const signInSuccess = (userData) => {
//   return { type: types.SIGN_IN_SUCCESS, userData };
// };

export const signIn = (username, password) => {
  return async function (dispatch) {
    try {
      const data = await authApi.signIn(username, password);
      // console.log(data)
      if (data) {
        apiUtils.setAccessToken(data.accessToken);
        apiUtils.setRefreshToken(data.refreshToken);
        dispatch(authUser(data.accessToken, data.refreshToken));
      }
    } catch (error) {
      throw error;
    }
  };
};

export const signUpSuccess = () => {
  return {type: types.SIGN_UP_SUCCESS};
};

export const signUp = (username, password) => {
  return async function (dispatch) {
    try {
      await authApi.signUp(username, password);
      dispatch(signUpSuccess());
    } catch (error) {
      throw error;
    }
  };
};

export const authUser = (token, refreshToken) => {
  return {type: types.AUTHENTICATE_THE_USER, token, refreshToken};
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  return {type: types.LOG_OUT};
};
