import { IAccountInfo } from "../state";
import { IAsyncResult, createAsyncAction } from "lib";

export interface IRegistrationArgs {
    email: string;
    password: string;
}

export interface IRegistrationResultPayload extends IAsyncResult<IAccountInfo> { }

export const RegistrationActionCreators = {
    register: createAsyncAction("REGISTER", (args: IRegistrationArgs) => {

        return {
            data: args,
            promise: fetch('/account/register', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(args),
                headers: [["content-type", "application/json"]]
            }).then(res => res.json())
            .then(result => ({ result }))
        };

    })
};


export const RegistrationActions = {
    register: RegistrationActionCreators.register.create

};

export type RegistrationActionsType = typeof RegistrationActions;