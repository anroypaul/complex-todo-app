import * as types from './actionTypes';
import * as todoApi from '../../api/todoApi';

// export const addTodoAction = (todo) => ({
//   type: types.ADD_TODO,
//   payload: todo,
// });

export const toggleTodoAction = (id) => ({
  type: types.TOGGLE_TODO,
  id,
});

export const createTodoSuccess = (todo) => ({
  type: types.CREATE_TODO_SUCCESS,
  todo,
});

export const updateTodoSuccess = (todo) => ({
  type: types.UPDATE_TODO_SUCCESS,
  todo,
});

export const loadTodosSuccess = (todos) => {
  return {type: types.LOAD_TODOS_SUCCESS, todos};
};

export const loadTodos = () => {
  return function (dispatch) {
    return todoApi
      .getTodos()
      .then((todos) => {
        dispatch(loadTodosSuccess(todos));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const saveTodo = (todo) => {
  return async function (dispatch, getState) {
    try {
      const savedTodo = await todoApi.saveTodo(todo);
      todo._id
        ? dispatch(updateTodoSuccess(savedTodo))
        : dispatch(createTodoSuccess(savedTodo));
    } catch (error) {
      throw error;
    }
  };
};
