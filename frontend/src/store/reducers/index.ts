import { combineReducers } from "@reduxjs/toolkit"
import { authenticationReducer } from "./authentication"
import { profileReducer } from "./profile"
import { pushNotificationsReducer } from "./pushNotifications"
import {
	authenticationApi,
	citiesApi,
	clubsApi,
	eventsApi,
	groupsApi,
	notificationsApi,
	profileApi,
} from "../apis"

export const rootReducer = combineReducers({
	authentication: authenticationReducer,
	profile: profileReducer,
	pushNotifications: pushNotificationsReducer,
	[groupsApi.reducerPath]: groupsApi.reducer,
	[eventsApi.reducerPath]: eventsApi.reducer,
	[notificationsApi.reducerPath]: notificationsApi.reducer,
	[profileApi.reducerPath]: profileApi.reducer,
	[clubsApi.reducerPath]: clubsApi.reducer,
	[citiesApi.reducerPath]: citiesApi.reducer,
	[authenticationApi.reducerPath]: authenticationApi.reducer,
})
