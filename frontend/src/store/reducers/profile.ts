import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfile, ProfileState } from "../types/profiles"

const initialState: ProfileState = {
	profile: {
		first_name: "",
		last_name: "",
		user: {
			id: 0,
			username: "",
			email: "",
			is_staff: false,
			is_active: false,
			is_verified: false,
			created_at: "",
			updated_at: "",
		},
		phones: [],
		photos: [],
	},
	isLoading: false,
	error: "",
}

export const profileSlice = createSlice({
	name: "profile",
	initialState: initialState,
	reducers: {
		userProfileLoading(state) {
			state.isLoading = true
		},
		userProfileLoadingSuccess(state, action: PayloadAction<IProfile>) {
			state.isLoading = false
			state.error = ""
			state.profile = action.payload
		},
		userProfileLoadingFail(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
		userProfileUpdate(state) {
			state.isLoading = true
		},
		userProfileUpdateSuccess(state, action: PayloadAction<IProfile>) {
			state.isLoading = false
			state.error = ""
			state.profile.first_name = action.payload.first_name
			state.profile.last_name = action.payload.last_name
			state.profile.mid_name = action.payload.mid_name
			state.profile.birth_date = action.payload.birth_date
		},
		userProfileUpdateFail(state, action: PayloadAction<string>) {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions
