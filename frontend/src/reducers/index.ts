import { combineReducers } from 'redux';
import { apiData } from 'reducers/apiData';
import { todos } from 'reducers/todos';
import { visibilityFilter } from 'reducers/visibilityFilter';
import modules from 'modules'
import { reducer as formReducer } from 'redux-form';

const moduleReducers: any = {};
modules.forEach(m => (moduleReducers[m.name] = m.reducer))

export const reducers = combineReducers({
  apiData,
  todos,
  visibilityFilter,
  form: formReducer,
  ...moduleReducers
});
