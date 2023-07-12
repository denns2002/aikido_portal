import { IUser } from "./users"

export interface IRank {
	id: number | undefined
	name: string
	price: number | undefined
}

export interface IRole {
	id: number | undefined
	name: string
}

export interface IProfile {
	user: IUser
	first_name: string
	last_name: string
	mid_name?: string
	avatar: string
	birth_date?: string
	updated_at: string
	slug: string
	rank: IRank
	roles: IRole[]
	club: string
	group: string
}

export interface IUpdatedProfile {
	first_name: string
	last_name: string
	mid_name?: string
	birth_date?: string
	city?: number
	rank?: number
	roles?: number[] 
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
