import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { INotification, NotificationsState } from "../types/notifications"

const initialState: NotificationsState = {
	notifications: []
}

export const notificationsSlice = createSlice({
    name: "notifications",
    initialState: initialState,
    reducers: {
        addNotification(state, action: PayloadAction<INotification>) {
            state.notifications.push(action.payload)
        },
        removeNotification(state, action: PayloadAction<string>) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
        },
    }
})

export const notificationsReducer = notificationsSlice.reducer
export const notificationsActions = notificationsSlice.actions
