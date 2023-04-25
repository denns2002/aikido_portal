import { combineReducers } from "@reduxjs/toolkit"
import { authenticationReducer } from "./authentication"
import { profileReducer } from "./profile"

export const rootReducer = combineReducers({
	authentication: authenticationReducer,
	profile: profileReducer,
})
