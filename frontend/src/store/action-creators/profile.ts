import { profileActions } from "../reducers/profile"
import { AppDispatch } from "../store"
import { IUpdatedProfile } from "../types/profile"
import { api } from "./api"

export function loadUserProfile() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(profileActions.userProfileLoading())

			const response = await api.get("/me/")

			dispatch(profileActions.userProfileLoadingSuccess(response.data))
		} catch (e) {
			dispatch(
				profileActions.userProfileLoadingFail(
					"Произошла ошибка при загрузку вашего профиля"
				)
			)
		}
	}
}

export function updateUserProfile(data: IUpdatedProfile, slug: string) {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(profileActions.userProfileUpdate())

			const body = JSON.stringify({...data})

			const response = await api.put(`/profile/update_profile/${slug}/`, body)

			dispatch(profileActions.userProfileUpdateSuccess(response.data))
		} catch (e) {
			dispatch(
				profileActions.userProfileUpdateFail(
					"Произошла ошибка во время обновления профиля"
				)
			)
		}
	}
}
