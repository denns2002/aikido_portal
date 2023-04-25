import { profileActions } from "../reducers/profile"
import { AppDispatch } from "../store"
import { api } from "./api"

export function loadUserProfile() {
	return async function (dispatch: AppDispatch) {
		try {
			dispatch(profileActions.userProfileLoading())

			const response = await api.get("/profile/my_profile/")

			console.log(response)

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
