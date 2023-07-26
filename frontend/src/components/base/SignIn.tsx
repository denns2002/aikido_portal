import React from "react"
import { useState } from "react"
import Input from "../forms/Input"
import { IInputAttributes, ILocationState } from "../../store/types/components"
import { useActions } from "../../hooks/useActions"
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"

interface SignInProps {
	isAuthenticated: boolean
	profileIsLoading: boolean
}

function SignIn({ isAuthenticated, profileIsLoading }: SignInProps) {
	const navigate = useNavigate()

	const [inputsValues, setInputValues] = useState({
		username: "",
		password: "",
	})

	const [errors, setErrors] = useState({
		username: "Это поле необходимо заполнить!",
		password: "Это поле необходимо заполнить!",
	})

	const [touched, setTouched] = useState({
		username: false,
		password: false,
	})

	const { signIn } = useActions()

	const { state: locationState } = useLocation()

	const formInputs: IInputAttributes[] = [
		{
			label: "Имя пользователя",
			type: "text",
			placeholder: "username",
			name: "username",
			value: inputsValues.username,
			required: true,
			touched: touched.username,
		},
		{
			label: "Пароль",
			type: "password",
			placeholder: "Пароль",
			name: "password",
			value: inputsValues.password,
			required: true,
			touched: touched.password,
		},
	]

	function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault()

		signIn(inputsValues)
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setInputValues({
			...inputsValues,
			[event.target.name]: event.target.value,
		})

		if (!event.target.value) {
			setErrors({
				...errors,
				[event.target.name]: "Это поле необходимо заполнить!",
			})

			return
		} else {
			setErrors({ ...errors, [event.target.name]: "" })
		}
	}

	function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
		setTouched({ ...touched, [event.target.name]: true })
	}

	if (profileIsLoading) {
		return <div className="font-semibold">Идет загрузка...</div>
	}

	if (locationState && isAuthenticated) {
		const { from } = locationState as ILocationState

		return <Navigate to={from} replace />
	} else if (isAuthenticated) {
		return <Navigate to="/events" replace />
	} else {
		return (
			<div className="h-full w-full flex flex-col items-center">
				<div className="h-full flex flex-col">
					<div className="h-full w-full flex flex-col items-center py-4 px-10 border-[1px] rounded-md border-sky-700">
						<h1 className="font-bold text-2xl">Авторизация</h1>
						<form
							className="flex flex-col gap-2 mt-6 w-80"
							onSubmit={handleSubmit}
						>
							<Input
								{...formInputs[0]}
								onChange={handleChange}
								onBlur={handleBlur}
								errors={[errors.username]}
							/>
							<Input
								{...formInputs[1]}
								onChange={handleChange}
								onBlur={handleBlur}
								errors={[errors.password]}
							/>
							<NavLink
								to="#"
								className="underline text-sky-500 hover:text-sky-300 text-sm -mt-1"
							>
								Забыли пароль?
							</NavLink>
							<div className="flex flex-col">
								{(errors.password && touched.password) ||
								(errors.username && touched.username) ? (
									<span className="text-red-700">
										Все поля должны быть заполнены!
									</span>
								) : null}
							</div>
							<div className="peer-pla flex justify-center">
								<button
									className="font-semibold rounded-md p-1 w-52 h-9 mt-2 enabled:hover:bg-sky-300 enabled:text-white enabled:bg-sky-500 disabled:bg-sky-100"
									type="submit"
									disabled={
										!(!errors.password && !errors.username)
									}
								>
									Войти
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profileIsLoading: state.profile.isLoading,
	}
}

export default connect(mapStateToProps, {})(SignIn)
