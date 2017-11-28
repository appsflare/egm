export interface IAccountInfo {
    _id: string;
    email: string;
}

export interface ILoginState {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    account?: IAccountInfo;
    error?: string;    
}

export interface IRegistrationState{
    isInProgress: boolean;
    isSuccessful: boolean;
    error?: string;
}

export interface IAccountModuleState {
    login: ILoginState;
    registration: IRegistrationState; 
}

export interface IApplicationState{
    accounts: IAccountModuleState
}