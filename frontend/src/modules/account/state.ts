export interface IAccountInfo{
    email: string;
}

export interface IAccountState{
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    account?: IAccountInfo;
}