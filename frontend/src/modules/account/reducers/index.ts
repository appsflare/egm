import { loginReducer } from './login-reducers';
import { registrationReducer } from './registration-reducers';
import { combineReducers } from 'redux';

export default combineReducers({ login: loginReducer, registration: registrationReducer });