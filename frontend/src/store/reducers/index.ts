import { combineReducers } from "@reduxjs/toolkit"
import { authenticationReducer } from "./authentication"
import { profileReducer } from "./profile"
import { pushNotificationsReducer } from "./pushNotifications"
import {
	clubsApi,
	eventsApi,
	groupsApi,
	notificationsApi,
	profilesApi,
	statementsApi,
	usersApi
} from "../apis"

export const rootReducer = combineReducers({
	authentication: authenticationReducer,
	profile: profileReducer,
	pushNotifications: pushNotificationsReducer,
	[groupsApi.reducerPath]: groupsApi.reducer,
	[eventsApi.reducerPath]: eventsApi.reducer,
	[notificationsApi.reducerPath]: notificationsApi.reducer,
	[profilesApi.reducerPath]: profilesApi.reducer,
	[clubsApi.reducerPath]: clubsApi.reducer,
	[statementsApi.reducerPath]: statementsApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
})
