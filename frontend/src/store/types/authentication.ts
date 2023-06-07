import { ITokens } from "./tokens"

export interface AuthenticationState {
	isAuthenticated: boolean
	isLoading: boolean
}

export interface ISignInData {
	username: string
	password: string
	tokens?: ITokens
}

export interface ISignUpData {
	username: string
	email?: string
	password: string
	password2: string
	is_verified?: boolean
}
