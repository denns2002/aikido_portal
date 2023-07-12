import React from "react"

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
	first_name: string
	last_name: string
	mid_name?: string
	avatar?: string
	birth_date?: string
	updated_at?: string
	slug?: string
	rank?: IRank
	next_rank?: number
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

export const ranks = {
	"6 кю детский": {bgColor: "bg-white", textColor: "text-black", text: "6 кю, дет."},
	"5 кю детский": {bgColor: "bg-yellow-300", textColor: "text-black", text: "5 кю, дет."},
	"4 кю детский": {bgColor: "bg-orange-600", textColor: "text-white", text: "4 кю, дет."},
	"3 кю детский": {bgColor: "bg-green-700", textColor: "text-white", text: "3 кю, дет."},
	"2 кю детский": {bgColor: "bg-blue-700", textColor: "text-white", text: "2 кю, дет."},
	"1 кю детский": {bgColor: "bg-yellow-900", textColor: "text-white", text: "1 кю, дет."},
	"5 кю": {bgColor: "bg-yellow-300", textColor: "text-black", text: "5 кю"},
	"4 кю": {bgColor: "bg-orange-600", textColor: "text-white", text: "4 кю"},
	"3 кю": {bgColor: "bg-green-700", textColor: "text-white", text: "3 кю"},
	"2 кю": {bgColor: "bg-blue-700", textColor: "text-white", text: "2 кю"},
	"1 кю": {bgColor: "bg-yellow-900", textColor: "text-white", text: "1 кю"},
	"1 дан": {bgColor: "bg-black", textColor: "text-white", text: "1 дан"},
	"2 дан": {bgColor: "bg-black", textColor: "text-white", text: "2 дан"},
	"3 дан": {bgColor: "bg-black", textColor: "text-white", text: "3 дан"},
	"4 дан": {bgColor: "bg-black", textColor: "text-white", text: "4 дан"},
	"5 дан": {bgColor: "bg-black", textColor: "text-white", text: "5 дан"},
}

export type RanksKey = keyof typeof ranks