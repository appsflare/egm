import { IAccountInfo } from "./state";
import { AsyncResult, createAction, createAsyncAction, createReceiveAsynAction } from "lib";

export interface LoginArgs {
    email: string;
    password: string;
}

export interface LoginPayload {
    promise: Promise<IAccountInfo>;
}

export interface LoginResultPayload extends AsyncResult<IAccountInfo> { }

export const AccountActionCreators = {
    login: createAsyncAction("LOGIN", (args: LoginArgs) => {
        return {
            promise: fetch('/account/login', { method: 'POST', body: JSON.stringify(args) })
                .then(res => res.json())
                .then(value => ({ value }))
        }
    }),
    loginPending: createAction('LOGIN_PRENDING', (args: LoginPayload) => args),
    loginCompleted: createReceiveAsynAction('LOGIN_FULFILLED', (args: LoginResultPayload) => args)
};

export const AccountActions = {
    login: AccountActionCreators.login.create,
    loginPending: AccountActionCreators.loginPending.create,
    loginCompleted: AccountActionCreators.loginCompleted.create
};