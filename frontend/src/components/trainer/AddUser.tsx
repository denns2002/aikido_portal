/* eslint-disable no-useless-escape */
import React from "react"
import { useState } from "react"
import Input from "../forms/Input"
import { IInputAttributes } from "../../store/types/components"
import { Popover } from "@headlessui/react"
import {FaExclamationCircle} from "react-icons/fa"

function AddUser() {
	const [inputsValues, setInputValues] = useState({
		secondName: "",
		firstName: "",
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	})

	const [errors, setErrors] = useState({
		secondName: "Это поле необходимо заполнить!",
		firstName: "Это поле необходимо заполнить!",
		username: "Это поле необходимо заполнить!",
		email: "Это поле необходимо заполнить!",
		emailValid: "Введена невалидная почта",
		password: "Это поле необходимо заполнить!",
		passwordLength: "Длина пароля меньше 8 символов",
		passwordLetter: "Пароль должен содержать одну букву",
		passwordNumber: "Пароль должен содержать одну цифру",
		passwordConfirm: "Это поле необходимо заполнить!",
		passwordConfirmValid: "Пароли должны совпадать",
	})

	const [touched, setTouched] = useState({
		secondName: false,
		firstName: false,
		username: false,
		email: false,
		password: false,
		passwordConfirm: false,
	})

	const formInputs: IInputAttributes[] = [
		{
			label: "Фамилия",
			type: "text",
			placeholder: "Фамилия",
			name: "secondName",
			value: inputsValues.secondName,
			required: true,
			touched: touched.secondName,
		},
		{
			label: "Имя",
			type: "text",
			placeholder: "Имя",
			name: "firstName",
			value: inputsValues.firstName,
			required: true,
			touched: touched.firstName,
		},
		{
			label: "Логин",
			type: "text",
			placeholder: "Логин",
			name: "username",
			value: inputsValues.username,
			required: true,
			touched: touched.username,
		},
		{
			label: "Почта",
			type: "email",
			placeholder: "Почта",
			name: "email",
			value: inputsValues.email,
			required: true,
			touched: touched.email,
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
		{
			label: "Подтвердите",
			type: "password",
			placeholder: "Подтвердите",
			name: "passwordConfirm",
			value: inputsValues.passwordConfirm,
			required: true,
			touched: touched.passwordConfirm,
		},
	]

	function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
		event.preventDefault()
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

		if (event.target.name === "password") {
			if (event.target.value.length < 8) {
				setErrors((prev) => ({
					...prev,
					passwordLength: "Длина пароля меньше 8 символов",
				}))
			} else {
				setErrors((prev) => ({ ...prev, passwordLength: "" }))
			}

			if (!event.target.value.match(/[A-Za-z]/g)) {
				setErrors((prev) => ({
					...prev,
					passwordLetter: "Пароль должен содержать одну букву",
				}))
			} else {
				setErrors((prev) => ({ ...prev, passwordLetter: "" }))
			}

			if (!event.target.value.match(/[0-9]/g)) {
				setErrors((prev) => ({
					...prev,
					passwordNumber: "Пароль должен содержать одну цифру",
				}))
			} else {
				setErrors((prev) => ({ ...prev, passwordNumber: "" }))
			}

			if (event.target.value !== inputsValues.passwordConfirm) {
				setErrors((prev) => ({
					...prev,
					passwordConfirmValid: "Пароли должны совпадать",
				}))
			} else {
				setErrors((prev) => ({ ...prev, passwordConfirmValid: "" }))
			}
		}

		if (event.target.name === "passwordConfirm") {
			if (!(event.target.value === inputsValues.password)) {
				setErrors((prev) => ({
					...prev,
					passwordConfirmValid: "Пароли должны совпадать",
				}))
			} else {
				setErrors((prev) => ({ ...prev, passwordConfirmValid: "" }))
			}
		}

		if (event.target.name === "email") {
			if (
				!event.target.value.match(
					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
				)
			) {
				setErrors((prev) => ({
					...prev,
					emailValid: "Введена невалидная почта",
				}))
			} else {
				setErrors((prev) => ({ ...prev, emailValid: "" }))
			}
		}
	}

	function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
		setTouched({ ...touched, [event.target.name]: true })
	}

	return (
		<div className="flex h-full w-full">
			<div className="relative top-0 left-0 bottom-0 right-0 m-auto flex flex-col items-center bg-sky-700 rounded-xl px-8 py-7">
				<label className="font-bold text-2xl text-white">
					Создайте пользователя
				</label>
				<form
					className="flex flex-col gap-2 mt-6 w-80"
					onSubmit={handleSubmit}
				>
					<div className="w-full flex flex-row gap-4">
						<Input
							{...formInputs[0]}
							errors={[errors.secondName]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Input
							{...formInputs[1]}
							errors={[errors.firstName]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					<Input
						{...formInputs[2]}
						errors={[errors.username]}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<Input
						{...formInputs[3]}
						errors={[errors.email, errors.emailValid]}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					{errors.emailValid && touched.email ? (
						<span className="text-red-400 mt-1">
							{errors.emailValid}
						</span>
					) : null}
					<div className="w-full flex flex-row gap-4 relative">
						<Input
							errors={[
								errors.password,
								errors.passwordLength,
								errors.passwordLetter,
								errors.passwordNumber,
							]}
							{...formInputs[4]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<Input
							errors={[
								errors.passwordConfirm,
								errors.passwordConfirmValid,
							]}
							{...formInputs[5]}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					<div className="-mt-1.5">
						<Popover>
							<Popover.Button className="text-slate-200 text-sm outline-none flex flex-row items-center">
								<FaExclamationCircle className="mr-0.5"/>
								<span className="hover:text-sky-300 underline">
									Требования к паролю
								</span>
							</Popover.Button>
							<Popover.Panel className="bg-slate-200 p-1 rounded w-full flex flex-row mt-0.5 transition-all">
								<div className="text-sm text-sky-700">
									{"- длина не менее 8 символов\n- минимум одна буква\n- минимум одна цифра"
										.split("\n")
										.map((err, index) => {
											return <p key={index}>{err}</p>
										})}
								</div>
							</Popover.Panel>
						</Popover>
					</div>
					<div className="flex flex-col -mt-0.5">
						{(errors.firstName && touched.firstName) ||
						(errors.secondName && touched.secondName) ||
						(errors.username && touched.username) ||
						(errors.email && touched.email) ||
						(errors.password && touched.password) ||
						(errors.passwordConfirm && touched.passwordConfirm) ? (
							<span className="text-red-400 text-sm">
								Все поля должны быть заполнены!
							</span>
						) : null}
						{!errors.password &&
						errors.passwordLength &&
						touched.password ? (
							<span className="text-red-400 text-sm">
								{errors.passwordLength}
							</span>
						) : null}
						{!errors.password &&
						errors.passwordLetter &&
						touched.password ? (
							<span className="text-red-400 text-sm">
								{errors.passwordLetter}
							</span>
						) : null}
						{!errors.password &&
						errors.passwordNumber &&
						touched.password ? (
							<span className="text-red-400 text-sm">
								{errors.passwordNumber}
							</span>
						) : null}
						{errors.passwordConfirmValid &&
						touched.passwordConfirm ? (
							<span className="text-red-400 text-sm">
								{errors.passwordConfirmValid}
							</span>
						) : null}
					</div>
					<div className="peer-pla flex justify-center">
						<button
							className="font-semibold rounded-md p-1 w-52 h-9 mt-1 enabled:hover:bg-sky-500 enabled:bg-sky-300 disabled:bg-sky-100"
							type="submit"
							disabled={
								!(
									!errors.secondName &&
									!errors.firstName &&
									!errors.username &&
									!errors.email &&
									!errors.password &&
									!errors.passwordConfirm
								)
							}
						>
							Зарегистрироваться
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddUser
