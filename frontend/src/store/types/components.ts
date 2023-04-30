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
	accessRoles: string[]
	icon: JSX.Element
}