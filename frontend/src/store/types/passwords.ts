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
