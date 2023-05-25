import React from "react"
import { useState } from "react"
import Input from "../forms/Input"
import { IInputAttributes } from "../../store/types/components"
import { useActions } from "../../hooks/useActions"
import { NavLink } from "react-router-dom"

function SignIn() {
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

		console.log(inputsValues)
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

	return (
		<div className="flex h-full w-full">
			<div className="relative top-0 left-0 bottom-0 right-0 m-auto flex flex-col items-center bg-sky-700 rounded-xl px-8 py-7">
				<label className="font-bold text-2xl text-white">
					Авторизация
				</label>
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
						className="underline text-sky-200 hover:text-sky-300 text-sm -mt-1"
					>
						Забыли пароль?
					</NavLink>
					<div className="flex flex-col">
						{(errors.password && touched.password) ||
						(errors.username && touched.username) ? (
							<span className="text-red-400">
								Все поля должны быть заполнены!
							</span>
						) : null}
					</div>
					<div className="peer-pla flex justify-center">
						<button
							className="font-semibold rounded-md p-1 w-52 h-9 mt-2 enabled:hover:bg-sky-500 enabled:bg-sky-300 disabled:bg-sky-100"
							type="submit"
							disabled={!(!errors.password && !errors.username)}
						>
							Войти
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default SignIn
