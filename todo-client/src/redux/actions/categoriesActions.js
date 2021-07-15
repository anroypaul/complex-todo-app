import * as types from './actionTypes';
import * as categoryApi from '../../api/categoryApi';
import {loadTodosSuccess} from './todoActions';

export const loadCategoriesSuccess = (categories) => {
  return {type: types.LOAD_CATEGORIES_SUCCESS, categories};
};

export const loadCategories = () => {
  return async function (dispatch) {
    try {
      const categories = await categoryApi.getCategoriesForCurrentUser();
      if (categories) dispatch(loadCategoriesSuccess(categories));
    } catch (error) {
      throw error;
    }
  };
};

// TODO: move to todo actions
export const loadTodosByCategory = (category, page, size) => {
  return async function (dispatch) {
    try {
      const todoList = await categoryApi.getTodosByCategory(
        category,
        page,
        size,
      );
      if (todoList) dispatch(loadTodosSuccess(todoList));
    } catch (error) {
      throw error;
    }
  };
};

export const createCategorySuccess = (category) => ({
  type: types.CREATE_CATEGORY_SUCCESS,
  category,
});

export const updateCategorySuccess = (category) => ({
  type: types.UPDATE_CATEGORY_SUCCESS,
  category,
});

export const saveCategory = (category) => {
  return async function (dispatch, getState) {
    try {
      const savedCategory = await categoryApi.save(category);
      category.id
        ? dispatch(updateCategorySuccess(savedCategory))
        : dispatch(createCategorySuccess(savedCategory));
    } catch (error) {
      throw error;
    }
  };
};

export const setCurrentCategory = (category) => {
  return {type: types.SWITCH_VIEW_CATEGORY, category};
};

export const switchCurrentCategory = (category, page = 1, size = 10) => {
  return async function (dispatch) {
    try {
      await dispatch(setCurrentCategory(category));
      await dispatch(loadTodosByCategory(category, page, size));
    } catch (error) {
      throw error;
    }
  };
};

export const incrementCurrentCategoryTodoCounter = () => ({
  type: types.INCREMENT_CURRENT_CATEGORY_TODO_COUNTER,
});

export const decrementCurrentCategoryTodoCounter = () => ({
  type: types.DECREMENT_CURRENT_CATEGORY_TODO_COUNTER,
});
