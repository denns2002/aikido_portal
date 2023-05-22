import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPushNotification, PushNotificationsState } from "../types/pushNotifications"

const initialState: PushNotificationsState = {
	notifications: [],
}

export const pushNotificationsSlice = createSlice({
	name: "notifications",
	initialState: initialState,
	reducers: {
		addPushNotification(state, action: PayloadAction<IPushNotification>) {
			state.notifications.push(action.payload)
		},
		removePushNotification(state, action: PayloadAction<string>) {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			)
		},
	},
})

export const pushNotificationsReducer = pushNotificationsSlice.reducer
export const pushNotificationsActions = pushNotificationsSlice.actions
