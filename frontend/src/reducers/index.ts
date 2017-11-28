import { combineReducers } from 'redux';
import { apiData } from 'reducers/apiData';
import { todos } from 'reducers/todos';
import { visibilityFilter } from 'reducers/visibilityFilter';
import { reducer as formReducer } from 'redux-form';

export const reducers = (modulesReducer: any = {}) => combineReducers({
  apiData,
  todos,
  visibilityFilter,
  form: formReducer,
  ...modulesReducer
});
