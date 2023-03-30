import { IUser } from "../../models";

export interface AuthenticationState {
    isAuthenticated: boolean;
    user: IUser;
}

export enum AuthenticationActionTypes {
    SIGNIN_SUCCES = 'SIGNIN_SUCCES',
    SIGNIN_FAIL = 'SIGNIN_FAIL',
    LOGOUT = 'LOGOUT'
}

interface SignInFailAction {
    type: AuthenticationActionTypes.SIGNIN_FAIL;
}

interface SignInSuccessAction {
    type: AuthenticationActionTypes.SIGNIN_SUCCES;
    payload: string;
}

interface LogoutAction {
    type: AuthenticationActionTypes.LOGOUT;
}

export type AuthenticationAction = SignInFailAction 
    | SignInSuccessAction 
    | LogoutAction;