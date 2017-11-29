import { createReducerBuilder } from 'lib';
import { ILoginState } from '../state';
import { LoginActionCreators, IRegistrationResultPayload } from '../actions';

export const loginReducer = createReducerBuilder<ILoginState>()
    .handleAsyncActions([LoginActionCreators.login, LoginActionCreators.checkLogin], {
        pending(state: ILoginState) {
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: true
            };
        },
        fulfilled(state: ILoginState, { result }: IRegistrationResultPayload) {
            return {
                ...state,
                account: result && { _id: result._id, email: result.email },
                isLoggedIn: result !== undefined,
                isLoggingIn: false
            };
        },
        rejected(state: ILoginState, { message }: Error) {
            return {
                ...state,
                account: undefined,
                isLoggedIn: false,
                isLoggingIn: false,
                error: message
            };
        }
    })
    .build({ isLoggedIn: false, isLoggingIn: true });