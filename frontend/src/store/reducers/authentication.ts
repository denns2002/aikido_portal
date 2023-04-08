import {
	AuthenticationAction,
	AuthenticationState,
	AuthenticationActionTypes,
} from "../types/authentication"

const initialState: AuthenticationState = {
	isAuthenticated: false,
	user: {
		username: "cringe",
	},
}

export function authenticationReducer(
	state = initialState,
	action: AuthenticationAction
): AuthenticationState {
	switch (action.type) {
		case AuthenticationActionTypes.SIGNIN_SUCCES:
			return {
				...state,
				isAuthenticated: true,
				user: {
					username: action.payload,
				},
			}
		case AuthenticationActionTypes.SIGNIN_FAIL:
		case AuthenticationActionTypes.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: {
					username: "",
				},
			}
		default:
			return state
	}
}
