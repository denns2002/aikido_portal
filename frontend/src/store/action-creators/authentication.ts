import { authenticationActions } from "../reducers/authentication"
import { AppDispatch } from "../store"
import { ISignInData } from "../types/authentication"
import { api } from "./api"
import { tokenService } from "../services/tokens"
import { loadUserProfile } from "./profile"
import { NotificationType } from "../types/notifications"
import { addNotification } from './notifications';
import { v4 } from "uuid"

export function signIn(data: ISignInData) {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.signIn())

			const body = JSON.stringify({ ...data })

			const response = await api.post("/auth/login/", body)

			if (response.data?.tokens?.access) {
				tokenService.setTokens(response.data.tokens)
			}

			dispatch(authenticationActions.signInSuccess())

			dispatch(loadUserProfile())
			dispatch(addNotification({id: v4(), type: NotificationType.Success, message: "Вы успешно авторизовались"}))
		} catch (e: any) {
			dispatch(
				authenticationActions.signInFail()
			)

			dispatch(addNotification({id: v4(), type: NotificationType.Error, message: "Не удалось авторизоваться"}))
		}
	}
}

export function verifyToken() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.verifyToken())

			const body = JSON.stringify({token: `${tokenService.getLocalRefreshToken()}`})

			await api.post("/auth/verify/", body)

		
		} catch (e) {
			console.log(e);

			dispatch(
				authenticationActions.verifyTokenFail()
			)
		}
	}
}

export function logOut() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(authenticationActions.logOut())

			const body = JSON.stringify({refresh: `${tokenService.getLocalRefreshToken()}`})

			await api.post("/auth/logout/", body)

			dispatch(authenticationActions.logOutSuccess())

			tokenService.removeTokens()
		} catch(e) {
			dispatch(authenticationActions.logOutFail())
		}
	}
}
