import { IAccountInfo } from "./state";
import { AsyncResult, createAction, createAsyncAction, createReceiveAsynAction } from "lib";

export interface ILoginArgs {
    email: string;
    password: string;
}

export interface ILoginPayload {
    promise: Promise<IAccountInfo>;
}

export interface ILoginResultPayload extends AsyncResult<IAccountInfo> { }

export const AccountActionCreators = {
    login: createAsyncAction("LOGIN", (args: ILoginArgs) => {

        return {
            promise: fetch('/account/login', {
                credentials:'include',
                method: 'POST',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(res => res.json())
                .then(result => ({ result }))
        }
    }),
    loginPending: createAction('LOGIN_PRENDING', (args: ILoginPayload) => args),
    loginCompleted: createReceiveAsynAction('LOGIN_FULFILLED', (args: ILoginResultPayload) => args),
    loginFailed: createAction('LOGIN_REJECTED', (args: Error) => args),
    checkLogin: createAsyncAction("CHECK_LOGIN", (args: ILoginArgs) => {

        return {
            promise: fetch('/account/me', {
                credentials:'include',
                method: 'GET',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(res => res.json())
                .then(result => ({ result }))
        }
    }),
    checkLoginPending: createAction('CHECK_LOGIN_PRENDING', (args: ILoginPayload) => args),
    checkLoginCompleted: createReceiveAsynAction('CHECK_LOGIN_FULFILLED', (args: ILoginResultPayload) => args),
    checkLoginFailed: createAction('CHECK_LOGIN_REJECTED', (args: Error) => args),
};

export const AccountActions = {
    login: AccountActionCreators.login.create,
    loginPending: AccountActionCreators.loginPending.create,
    loginCompleted: AccountActionCreators.loginCompleted.create,
    loginFailed: AccountActionCreators.loginFailed.create,
    checkLogin: AccountActionCreators.checkLogin.create,
    checkLoginPending: AccountActionCreators.checkLoginPending.create,
    checkLoginCompleted: AccountActionCreators.checkLoginCompleted.create,
    checkLoginFailed: AccountActionCreators.checkLoginFailed.create
};

export type AccountActionsType = typeof AccountActions;