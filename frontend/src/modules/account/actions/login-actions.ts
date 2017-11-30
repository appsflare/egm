import { IAccountInfo } from "../state";
import { IAsyncResult, createAsyncAction } from "lib";

export interface ILoginArgs {
    email: string;
    password: string;
}

export interface ILoginPayload {
    promise: Promise<IAccountInfo>;
    data: ILoginArgs
}
interface ILogoutResult {
    result: boolean;
}
export interface ILoginResultPayload extends IAsyncResult<IAccountInfo> { }
export interface ILogoutResultPayload extends IAsyncResult<ILogoutResult> { }

export const LoginActionCreators = {
    login: createAsyncAction("LOGIN", (args: ILoginArgs) => {

        return {
            data: args,
            promise: fetch('/account/login', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(res => res.json())
                .then(result => ({ result }))
        };

    }),
    logout: createAsyncAction("LOGOUT", (args: any) => {
        return {
            data: args,
            promise: fetch('/account/logout', {
                credentials: 'include',
                method: 'GET',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(res => res.json())
                .then(result => ({ result }))
        };
    }),
    checkLogin: createAsyncAction("CHECK_LOGIN", (args: ILoginArgs) => {

        return {
            promise: fetch('/account/me', {
                credentials: 'include',
                method: 'GET',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(async (res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const result = await res.json();
                if (!result.isLoggedIn) {
                    throw new Error('Not logged in!');
                }
                return result;
            }).then(result => ({ result }))
        };

    })
};


export const LoginActions = {
    login: LoginActionCreators.login.create,
    logout: LoginActionCreators.logout.create,
    checkLogin: LoginActionCreators.checkLogin.create
};

export type LoginActionsType = typeof LoginActions;