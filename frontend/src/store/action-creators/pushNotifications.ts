import { pushNotificationsActions } from "../reducers/pushNotifications"
import { AppDispatch } from "../store"
import { IPushNotification } from "../types/pushNotifications"

export function addPushNotification(data: IPushNotification) {
	return function (dispatch: AppDispatch) {
		dispatch(pushNotificationsActions.addPushNotification(data))
	}
}

export function removePushNotification(data: string) {
	return function (dispatch: AppDispatch) {
		dispatch(pushNotificationsActions.removePushNotification(data))
	}
}
