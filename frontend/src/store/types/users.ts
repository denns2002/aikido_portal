import { ITokens } from "./tokens"

export interface IUser {
	id: number | undefined
	username: string
	email: string
	is_staff: boolean
	is_active: boolean
	is_verified: boolean
	created_at: string
	updated_at: string
}

export interface ISignInData {
	username: string
	password: string
	tokens?: ITokens
}
