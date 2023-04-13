import {
	AuthenticationAction,
	AuthenticationState,
	AuthenticationActionTypes,
} from "../types/authentication"

const initialState: AuthenticationState = {
	isAuthenticated: false,
	user: {
		username: "",
		secondName: "",
		firstName: "",
		role: ""
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
					...state.user,
					username: action.payload,
					secondName: "Фамилия",
					firstName: "Имя",
					role: "SPORTSMAN"
				},
			}
		case AuthenticationActionTypes.SIGNIN_FAIL:
		case AuthenticationActionTypes.LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				user: {
					username: "",
					secondName: "",
					firstName: "",
					role: ""
				},
			}
		default:
			return state
	}
}
