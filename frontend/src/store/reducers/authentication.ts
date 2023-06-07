import { createSlice } from "@reduxjs/toolkit"
import { AuthenticationState } from "../types/authentication"

const initialState: AuthenticationState = {
	isAuthenticated: false,
	isLoading: false,
}

export const authenticationSlice = createSlice({
	name: "authentication",
	initialState: initialState,
	reducers: {
		refreshToken(state) {
			state.isLoading = true
			
		},
		refreshTokenSuccess(state) {
			state.isLoading = false
		},
		refreshTokenFail(state) {
			state.isLoading = false
		},
		signIn(state) {
			state.isLoading = true
		},
		signInSuccess(state) {
			state.isLoading = false
			state.isAuthenticated = true
		},
		signInFail(state) {
			state.isLoading = false
			state.isAuthenticated = false
		},
		verifyToken(state) {
			state.isLoading = true
		},
		verifyTokenSuccess(state) {
			state.isLoading = false
			state.isAuthenticated = true
		},
		verifyTokenFail(state) {
			state.isLoading = false
			state.isAuthenticated = false
		},
		logOut(state) {
			state.isLoading = true
		},
		logOutSuccess(state) {
			state.isLoading = false
			state.isAuthenticated = false
		},
		logOutFail(state) {
			state.isLoading = false
			state.isAuthenticated = false
		},
	},
})

export const authenticationReducer = authenticationSlice.reducer
export const authenticationActions = authenticationSlice.actions
