import { createReducerBuilder } from 'lib';
import { IAccountState } from './state';
import { AccountActionCreators, ILoginResultPayload } from './actions';

const builder = createReducerBuilder<IAccountState>();

builder.registerMultiple([AccountActionCreators.loginPending, AccountActionCreators.checkLoginPending], (state: IAccountState) => {
    return {
        ...state,
        isLoggedIn: false,
        isLoggingIn: true
    }
});

builder.registerMultiple([AccountActionCreators.loginCompleted, AccountActionCreators.checkLoginCompleted], (state: IAccountState, { result }: ILoginResultPayload) => {
    return {
        ...state,
        account: result && { _id: result._id, email: result.email },
        isLoggedIn: result !== undefined,
        isLoggingIn: false
    }
});

builder.registerMultiple([AccountActionCreators.loginFailed, AccountActionCreators.checkLoginFailed], (state: IAccountState, { message }: Error) => {
    return {
        ...state,
        account: undefined,
        isLoggedIn: false,
        isLoggingIn: false,
        error: message
    }
});

export default builder.build({ isLoggedIn: false, isLoggingIn: false });