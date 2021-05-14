import {combineReducers} from 'redux';
import todos from './todoReducer';
import auth from './authReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({categories, todos, auth});

export default rootReducer;
