import * as types from './actionTypes';
import * as todoApi from '../../api/todoApi';
import {incrementCurrentCategoryTodoCounter} from './categoriesActions';
// export const addTodoAction = (todo) => ({
//   type: types.ADD_TODO,
//   payload: todo,
// });

export const toggleTodoAction = (id) => ({
  type: types.TOGGLE_TODO,
  id,
});

export const deleteTodoAction = (id) => ({
  type: types.DELETE_TODO,
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

export const loadTodos = (page = 1, size = 10) => {
  return async function (dispatch) {
    try {
      const todos = await todoApi.getTodos(page, size);
      if (todos) dispatch(loadTodosSuccess(todos));
    } catch (error) {
      throw error;
    }
  };
};

export const saveTodo = (todo) => {
  return async function (dispatch, getState) {
    try {
      const savedTodo = await todoApi.saveTodo(todo);
      if (todo.id) dispatch(updateTodoSuccess(savedTodo));
      else {
        dispatch(incrementCurrentCategoryTodoCounter());
        dispatch(createTodoSuccess(savedTodo));
      }
    } catch (error) {
      throw error;
    }
  };
};
