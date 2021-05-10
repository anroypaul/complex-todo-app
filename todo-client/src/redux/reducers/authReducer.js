import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {object} state
 */
export default function authReducer(state = initialState.auth, action) {
  switch (action.type) {
    // case types.SIGN_IN_SUCCESS:
    //   console.log(action)
    //   return {
    //     ...state,
    //     accessToken: action.userData.accessToken,
    //     refreshToken: action.userData.refreshToken,
    //   };

    case types.SIGN_UP_SUCCESS:
      return {...state, errorMessage: 'USER_WAS_REGISTERED_SUCCESSFULLY'};

    case types.AUTHENTICATE_THE_USER:
      return {
        ...state,
        accessToken: action.token,
        refreshToken: action.refreshToken,
        isAuthenticated: true,
      };

    case types.SET_TOKENS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };

    default:
      return state;
  }
}
