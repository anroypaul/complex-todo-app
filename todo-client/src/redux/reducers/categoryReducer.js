import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {state}
 */
export default function todoReducer(state = initialState.categories, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories;

    default:
      return state;
  }
}
