import { IconType } from "react-icons"

export interface IInputAttributes {
	label: string
	type: string
	placeholder: string
	name: string
	value: string
	required: boolean
	touched: boolean
}

export interface INavLink {
	to: string
	label: string
	roles: string[]
	icon: JSX.Element
}
export interface IUser {
	username: string,
	secondName: string,
	firstName: string
}
