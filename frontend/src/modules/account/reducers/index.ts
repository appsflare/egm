import { loginReducer } from './login-reducers';
import { logoutReducer } from './logout-reducers';
import { registrationReducer } from './registration-reducers';
import { combineReducers } from 'redux';

export default combineReducers({
    login: loginReducer,
    logout: logoutReducer,
    registration: registrationReducer
});