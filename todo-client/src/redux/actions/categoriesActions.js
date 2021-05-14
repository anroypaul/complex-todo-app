import * as types from './actionTypes';
import * as categoryApi from '../../api/categoryApi';

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
