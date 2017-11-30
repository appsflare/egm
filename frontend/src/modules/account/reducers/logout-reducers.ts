import { createReducerBuilder } from 'lib';
import { ILogoutState } from '../state';
import { LoginActionCreators } from '../actions';

export const logoutReducer = createReducerBuilder<ILogoutState>()
    .handleAsyncActions([LoginActionCreators.login, LoginActionCreators.checkLogin], {
        pending(state: ILogoutState) {
            return {
                ...state,
                isLoggedOut: false,
                isLoggingOut: true
            };
        },
        fulfilled(state: ILogoutState) {
            return {
                ...state,
                isLoggedOut: true,
                isLoggingOut: true
            };
        },
        rejected(state: ILogoutState, { message }: Error) {
            return {
                ...state,
                isLoggedOut: false,
                isLoggingOut: false,
                error: message
            };
        }
    })
    .build({ isLoggedOut: false, isLoggingOut: true });