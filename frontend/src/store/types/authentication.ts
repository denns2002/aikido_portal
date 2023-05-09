export interface AuthenticationState {
	isAuthenticated: boolean
	isLoading: boolean
}

export interface ISignInData {
	username: string
	password: string
}

export interface ITokens {
	access: string
	refresh: string
}
