import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthenticationState } from "../types/authentication"

const initialState: AuthenticationState = {
	isAuthenticated: false,
	isLoading: false,
	error: "",
}

export const authenticationSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		signIn(state) {
			state.isLoading = true
		},
		signInSuccess(state) {
			state.isLoading = false
			state.isAuthenticated = true
			state.error = ""
		},
		signInFail(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
			state.isAuthenticated = false
		},
	},
})

export const authenticationReducer = authenticationSlice.reducer
export const authenticationActions = authenticationSlice.actions
