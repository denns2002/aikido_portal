import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfile, IUpdatedProfile, ProfileState } from "../types/profile"

const initialState: ProfileState = {
	profile: {
		user: {
			id: undefined,
			username: "",
			email: "",
			is_staff: false,
			is_active: false,
			is_verified: false,
			created_at: "",
			updated_at: "",
		},
		first_name: "",
		last_name: "",
		mid_name: "",
		club: "",
		group: "",
		avatar: "",
		birth_date: "",
		updated_at: "",
		slug: "",
		rank: {
			id: undefined,
			name: "",
			price: undefined,
		},
		roles: [],
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
		userProfileUpdateSuccess(state, action: PayloadAction<IUpdatedProfile>) {
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
