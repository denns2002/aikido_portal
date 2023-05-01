export interface IRegion {
	name: string
}

export interface ICity {
	region?: IRegion | undefined
	name?: string
	id: number | undefined
}

export interface IRank {
	id: number | undefined
	name: string
	price: number | undefined
}

export interface IRole {
	id: number | undefined
	name: string
}

export interface IUser {
	id: number | undefined
	password: string
	last_login: string
	is_superuser: boolean
	username: string
	email: string
	is_staff: boolean
	is_active: boolean
	is_verified: boolean
	created_at: string
	updated_at: string
	groups: number[]
	user_permisions: number[]
}

export interface IProfile {
	user: IUser
	first_name: string
	last_name: string
	mid_name: string
	avatar: string
	birth_date: string
	updated_at: string
	slug: string
	city: ICity
	rank: IRank
	roles: IRole[]
}

export interface IUpdatedProfile {
	first_name: string
	last_name: string
	mid_name: string
	birth_date: string
	city: ICity
	updated_at?: string
}

export interface ProfileState {
	profile: IProfile
	isLoading: boolean
	error: string
}