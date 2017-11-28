import { createReducerBuilder } from 'lib';
import { ILoginState } from '../state';
import { AccountActionCreators, ILoginResultPayload } from '../actions';

export const loginReducer = createReducerBuilder<ILoginState>()
    .handleAsyncActions([AccountActionCreators.login, AccountActionCreators.checkLogin], {
        pending(state: ILoginState) {
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: true
            };
        },
        fulfilled(state: ILoginState, { result }: ILoginResultPayload) {
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