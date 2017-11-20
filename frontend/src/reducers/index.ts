import { combineReducers } from 'redux';
import { apiData } from 'reducers/apiData';
import { todos } from 'reducers/todos';
import { visibilityFilter } from 'reducers/visibilityFilter';
import modules from 'modules'


export const reducers = combineReducers({
  apiData,
  todos,
  visibilityFilter,
  gateways: modules[0].reducer
});
