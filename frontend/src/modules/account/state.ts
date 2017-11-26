export interface IAccountInfo {
    _id: string;
    email: string;
}

export interface IAccountState {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    account?: IAccountInfo;
    error?: string;
}