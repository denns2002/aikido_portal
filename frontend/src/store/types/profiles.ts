import { IUser } from "./users"

export interface IProfile {
	first_name: string
	last_name: string
	mid_name?: string
	avatar?: string
	birth_date?: string
	updated_at?: string
	slug?: string
	rank?: IRank
	next_rank?: number
	club?: string
	group?: string
	user: IUser
	phones: IPhone[]
	photos: number[]
}

export interface IUserRegister {
	first_name: string
	last_name: string
	mid_name?: string
	birth_date?: string
	username?: string
	password?: string
}

export interface IProfileList {
	count: number
	next?: string
	previous?: string
	results: IProfile[]
}

// export interface IUpdatedProfile {
// 	first_name: string
// 	last_name: string
// 	mid_name?: string
// 	avatar?: string
// 	birth_date?: string
// 	updated_at?: string
// 	slug?: string
// 	rank?: IUpdatedRank
// 	next_rank?: number
// 	user: IUpdatedUser
// 	phones: IPhone[]
// 	photos: number[]
// }

export interface IRank {
	id?: number
	name: string
}

export interface IUpdatedUser {
	id?: number
	username: string
	email?: string
	is_staff?: boolean
	is_active?: boolean
	is_verified?: boolean
	created_at?: string
	updated_at?: string
}

export interface IPhone {
	number: string
}

export interface ProfileState {
	profile: IProfile
	isLoading: boolean
	error: string
}
