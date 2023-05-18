import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./reducers"
import {
	authenticationApi,
	citiesApi,
	clubsApi,
	eventsApi,
	groupsApi,
	notificationsApi,
	profileApi,
	statementsApi,
} from "./apis"

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			groupsApi.middleware,
			eventsApi.middleware,
			notificationsApi.middleware,
			profileApi.middleware,
			clubsApi.middleware,
			citiesApi.middleware,
			authenticationApi.middleware,
			statementsApi.middleware
		)
	},
})

export type IRootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
