import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import {
	clubsApi,
	eventsApi,
	groupsApi,
	notificationsApi,
	profilesApi,
	statementsApi,
	usersApi
} from "./apis"

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			groupsApi.middleware,
			eventsApi.middleware,
			notificationsApi.middleware,
			profilesApi.middleware,
			clubsApi.middleware,
			statementsApi.middleware,
			usersApi.middleware
		)
	},
})

export type IRootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
