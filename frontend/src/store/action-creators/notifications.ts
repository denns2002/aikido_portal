import { notificationsActions } from "../reducers/notifications"
import { AppDispatch } from "../store"
import { INotification } from "../types/notifications"

export function addNotification(data: INotification) {
	return function (dispatch: AppDispatch) {
		dispatch(notificationsActions.addNotification(data))
	}
}

export function removeNotification(data: string) {
	return function (dispatch: AppDispatch) {
		dispatch(notificationsActions.removeNotification(data))
	}
}
