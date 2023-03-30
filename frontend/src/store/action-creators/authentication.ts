import { AuthenticationActionTypes } from './../types/authentication';
import { Dispatch } from '@reduxjs/toolkit';
import { AuthenticationAction } from '../types/authentication';

interface ISignInData {
	username: string;
	password: string;
}

export function signIn(data: ISignInData) {
	return function (dispatch: Dispatch<AuthenticationAction>) {
		if (data.password !== '123') {
			dispatch({ type: AuthenticationActionTypes.SIGNIN_SUCCES, payload: data.username });
		} else {
			dispatch({ type: AuthenticationActionTypes.SIGNIN_FAIL });
		}
	};
}

export function logout() {
	return function (dispatch: Dispatch) {
		dispatch({ type: AuthenticationActionTypes.LOGOUT });
	};
}
