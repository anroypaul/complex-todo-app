import * as types from '../actions/actionTypes';
import initialState from './initialState';

/**
 *
 * @param {*} state
 * @param {*} action
 * @return {state}
 */
export default function todoReducer(state = initialState.todos, action) {
  switch (action.type) {
    case types.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? {...todo, completed: !todo.completed} : todo,
      );
    // case types.ADD_TODO:
    //   const = action.todo;
    //   return [
    //     ...state,
    //     {
    //       id: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    //       description: description,
    //       date: date,
    //       completed: false,
    //     },
    //   ];
    case types.CREATE_TODO_SUCCESS:
      return [...state, {...action.todo}];

    case types.UPDATE_TODO_SUCCESS:
      return state.map((todo) =>
        todo._id === action.todo._id ? action.todo : todo,
      );
    case types.LOAD_TODOS_SUCCESS:
      return action.todos;

    default:
      return state;
  }
}
