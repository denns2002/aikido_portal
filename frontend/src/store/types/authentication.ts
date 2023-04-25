export interface AuthenticationState {
	isAuthenticated: boolean
	isLoading: boolean
	error: string
}

export interface ISignInData {
	username: string
	password: string
}

export interface ITokens {
	access: string
	refresh: string
}
