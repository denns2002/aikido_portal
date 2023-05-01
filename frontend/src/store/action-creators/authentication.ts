import { authenticationActions } from "../reducers/authentication"
import { AppDispatch } from "../store"
import { ISignInData } from "../types/authentication"
import { api } from "./api"
import { tokenService } from "../services/tokens"
import { loadUserProfile } from "./profile"

export function signIn(data: ISignInData) {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.signIn())

			const body = JSON.stringify({ ...data })
			console.log(body);


			const response = await api.post("/auth/login/", body)

			if (response.data?.tokens?.access) {
				tokenService.setTokens(response.data.tokens)
			}

			dispatch(authenticationActions.signInSuccess())

			dispatch(loadUserProfile())
		} catch (e) {
			console.log(e);

			dispatch(
				authenticationActions.signInFail(
					"Произошла ошибка при попытке входа"
				)
			)
		}
	}
}

export function verifyToken() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.verifyToken())

			const body = JSON.stringify({token: `${tokenService.getLocalRefreshToken()}`})

			await api.post("/auth/verify/", body)

			dispatch(authenticationActions.verifyTokenSuccess())
		} catch (e) {
			console.log(e);

			dispatch(
				authenticationActions.verifyTokenFail(
					"у токена истек срок жизни"
				)
			)
		}
	}
}

export function signOut() {
	return function (dispatch: AppDispatch) {}
}
