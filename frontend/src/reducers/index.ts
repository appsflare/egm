import { combineReducers } from 'redux';
import { apiData } from 'reducers/apiData';
import { todos } from 'reducers/todos';
import { visibilityFilter } from 'reducers/visibilityFilter';
import { GatewaysModuleInfo } from 'modules'


export const reducers = combineReducers({
  apiData,
  todos,
  visibilityFilter,
  gateways: GatewaysModuleInfo.reducer
});
