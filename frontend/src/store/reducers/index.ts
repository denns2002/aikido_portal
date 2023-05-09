import { combineReducers } from "@reduxjs/toolkit"
import { authenticationReducer } from "./authentication"
import { profileReducer } from "./profile"
import { notificationsReducer } from "./notifications"

export const rootReducer = combineReducers({
	authentication: authenticationReducer,
	profile: profileReducer,
	notifications: notificationsReducer,
})
