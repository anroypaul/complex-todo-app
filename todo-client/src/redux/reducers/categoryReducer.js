import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {state}
 */
export default function categoryReducer(
  state = initialState.categories,
  action,
) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories;
    case types.CREATE_CATEGORY_SUCCESS:
      return [...state, {...action.category}];
    case types.UPDATE_CATEGORY_SUCCESS:
      return state.map((category) =>
        category.id === action.category.id ? action.category : category,
      );
    case types.SWITCH_VIEW_CATEGORY:
      return state.map((category) => {
        if (category.id === action.category.id) {
          category.selected = true;
          return category;
        } else {
          category.selected = false;
        }

        return {
          ...category,
        };
      });
    case types.INCREMENT_CURRENT_CATEGORY_TODO_COUNTER:
      return state.map((category) => {
        if (category.selected === true)
          category.todoCount = parseInt(category.todoCount) + 1;
        return category;
      });
    case types.DECREMENT_CURRENT_CATEGORY_TODO_COUNTER:
      return state.map((category) => {
        if (category.selected === true)
          category.todoCount = parseInt(category.todoCount) - 1;
        return category;
      });

    default:
      return state;
  }
}
