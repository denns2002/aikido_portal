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

export interface ITokens {
	access: string
	refresh: string
}

export interface IChangePassword {
	old_password: string
	password: string
	password2: string
}

export interface ISetPassword {
	password: string
	token: string
	uidb64: string
}

export interface IResetPasswordEmailRequest {
	email: string
}
