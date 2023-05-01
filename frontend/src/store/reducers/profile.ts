import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IProfile, ProfileState } from "../types/profile"

const initialState: ProfileState = {
	profile: {
		user: {
			id: undefined,
			password: "",
			last_login: "",
			is_superuser: false,
			username: "",
			email: "",
			is_staff: false,
			is_active: false,
			is_verified: false,
			created_at: "",
			updated_at: "",
			groups: [],
			user_permisions: [],
		},
		first_name: "",
		last_name: "",
		mid_name: "",
		avatar: "",
		birth_date: "",
		updated_at: "",
		slug: "",
		city: {
			id: undefined,
			name: "",
			region: undefined,
		},
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
	},
})

export const profileReducer = profileSlice.reducer
export const profileActions = profileSlice.actions