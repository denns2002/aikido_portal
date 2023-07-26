import { ITokens } from "./tokens"

export interface IUser {
	id?: number
	username: string
	email?: string
	is_staff?: boolean
	is_active?: boolean
	is_verified?: boolean
	created_at?: string
	updated_at?: string
}

export interface ISignInData {
	username: string
	password: string
	tokens?: ITokens
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
