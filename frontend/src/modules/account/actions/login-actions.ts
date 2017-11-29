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

export interface ILoginResultPayload extends IAsyncResult<IAccountInfo> { }

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
    checkLogin: createAsyncAction("CHECK_LOGIN", (args: ILoginArgs) => {

        return {
            promise: fetch('/account/me', {
                credentials: 'include',
                method: 'GET',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(res => res.json())
                .then(result => ({ result }))
        };

    })
};


export const LoginActions = {
    login: LoginActionCreators.login.create,
    checkLogin: LoginActionCreators.checkLogin.create,

};

export type LoginActionsType = typeof LoginActions;