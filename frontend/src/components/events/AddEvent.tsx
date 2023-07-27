import { usePostEventMutation } from "../../store/apis"
import { IInputAttributes } from "../../store/types/components"
import { IEvent } from "../../store/types/events"
import { FormEvent, useState } from "react"
import Input from "../forms/Input"
import TextArea from "../forms/TextArea"
import { useNavigate } from "react-router-dom"

function AddEvent() {
	const [addEvent, { error }] = usePostEventMutation()
	const navigate = useNavigate()

	const [settings, setSettings] = useState({
		seminar: false,
		attestation: false,
	})

	const [inputsValues, setInputValues] = useState<IEvent>({
		name: "",
		about: "",
		reg_start: "",
		reg_end: "",
		date_end: "",
		date_start: "",
		address: "",
	})

	const [touched, setTouched] = useState({
		name: false,
		about: false,
		reg_start: false,
		reg_end: false,
		date_end: false,
		date_start: false,
		address: false,
	})

	const [errors, setErrors] = useState({
		name: "Это поле необходимо заполнить!",
		about: "Это поле необходимо заполнить!",
		reg_start: "Это поле необходимо заполнить!",
		reg_end: "Это поле необходимо заполнить!",
		date_end: "Это поле необходимо заполнить!",
		date_start: "Это поле необходимо заполнить!",
		address: "Это поле необходимо заполнить!",
	})

	const formInputs: IInputAttributes[] = [
		{
			label: "Название",
			type: "text",
			placeholder: "name",
			name: "name",
			value: inputsValues.name,
			required: true,
			touched: touched.name,
		},
		{
			label: "Начало",
			type: "date",
			placeholder: "reg_start",
			name: "reg_start",
			value: inputsValues.reg_start,
			required: true,
			touched: touched.reg_start,
		},
		{
			label: "Конец",
			type: "date",
			placeholder: "reg_end",
			name: "reg_end",
			value: inputsValues.reg_end,
			required: true,
			touched: touched.reg_end,
		},
		{
			label: "Начало",
			type: "date",
			placeholder: "date_start",
			name: "date_start",
			value: inputsValues.date_start,
			required: true,
			touched: touched.date_start,
		},
		{
			label: "Конец",
			type: "date",
			placeholder: "date_end",
			name: "date_end",
			value: inputsValues.date_end,
			required: true,
			touched: touched.date_end,
		},
		{
			label: "Информация о мероприятии",
			type: "text",
			placeholder: "about",
			name: "about",
			value: inputsValues.about,
			rows: 5,
			required: true,
			touched: touched.about,
		},
		{
			label: "Место проведения",
			type: "text",
			placeholder: "address",
			name: "address",
			value: inputsValues.address,
			required: true,
		},
		{
			label: "Семинар",
			type: "datetime-local",
			placeholder: "seminar_date",
			name: "seminar_date",
			value: inputsValues.seminar_date,
			required: true,
		},
		{
			label: "Аттестация",
			type: "datetime-local",
			placeholder: "attestation_date",
			name: "attestation_date",
			value: inputsValues.attestation_date,
			required: true,
		},
	]

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		await addEvent(inputsValues).unwrap()

		if (!error) {
			navigate("/events/upcoming")
		}
	}

	function handleChange(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
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

	function handleBlur(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		setTouched({ ...touched, [event.target.name]: true })
	}

	return (
		<div className="h-full w-full flex flex-col items-center">
			<div className="h-full w-[60rem] relative flex flex-col">
				<h1 className="border-l-4 border-sky-700 px-1 text-3xl font-bold">
					Добавить мероприятие
				</h1>
				<form
					className="w-full flex flex-col gap-2 mt-6"
					onSubmit={handleSubmit}
				>
					<Input
						{...formInputs[0]}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={[errors.name]}
					/>
					<div className="flex flex-row gap-4">
						<div className="w-[50rem] text-xl font-medium flex items-center">
							<span className="">Регистрация:</span>
						</div>
						<Input
							{...formInputs[1]}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={[errors.reg_start]}
						/>
						<Input
							{...formInputs[2]}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={[errors.reg_end]}
						/>
					</div>
					<div className="flex flex-row gap-4">
						<div className="w-[50rem] text-xl font-medium flex items-center">
							<span className="">Время проведения:</span>
						</div>
						<Input
							{...formInputs[3]}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={[errors.date_start]}
						/>
						<Input
							{...formInputs[4]}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={[errors.date_end]}
						/>
					</div>
					<Input
							{...formInputs[6]}
							onChange={handleChange}
							onBlur={handleBlur}
							errors={[errors.address]}
						/>
					<TextArea
						{...formInputs[5]}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={[errors.about]}
					/>
					<div className="flex flex-row gap-4">
						<div className="w-[50rem] text-xl font-medium flex items-center">
							<span className="">Программа:</span>
						</div>
						<button
							className={`${
								settings.seminar
									? "bg-green-500 hover:bg-green-400"
									: "bg-slate-500 hover:bg-green-300"
							} w-full font-semibold rounded-md p-1 text-white transition-all duration-200 text-lg`}
							type="button"
							onClick={() => {
								setSettings((prev) => ({
									...prev,
									seminar: !prev.seminar,
								}))

								if (!settings.seminar) {
									setInputValues((prev) => ({
										...prev,
										is_seminar: true,
										seminar_date: "",
									}))
								} else {
									setInputValues((prev) => ({
										...prev,
										is_seminar: false,
										seminar_date: "",
									}))
								}
							}}
						>
							Семинар
						</button>
						<button
							className={`${
								settings.attestation
									? "bg-green-500 hover:bg-green-400"
									: "bg-slate-500 hover:bg-green-300"
							} w-full font-semibold rounded-md p-1 text-white transition-all duration-200 text-lg`}
							type="button"
							onClick={() => {
								setSettings((prev) => ({
									...prev,
									attestation: !prev.attestation,
								}))

								if (!settings.attestation) {
									setInputValues((prev) => ({
										...prev,
										is_attestation: true,
										attestation_date: "",
									}))
								} else {
									setInputValues((prev) => ({
										...prev,
										is_attestation: false,
										attestation_date: "",
									}))
								}
							}}
						>
							Аттестация
						</button>
					</div>
					<div className="flex flex-row gap-4">
						<div
							className={`w-[24rem] text-xl font-medium flex items-center ${
								settings.seminar ? null : "text-slate-300"
							}`}
						>
							<span className="">Семинар:</span>
						</div>
						<Input
							{...formInputs[7]}
							onChange={handleChange}
							onBlur={handleBlur}
							disabled={!settings.seminar}
						/>
					</div>
					<div className="flex flex-row gap-4">
						<div
							className={`w-[24rem] text-xl font-medium flex items-center ${
								settings.attestation ? null : "text-slate-300"
							}`}
						>
							<span className="">Аттестация:</span>
						</div>
						<Input
							{...formInputs[8]}
							onChange={handleChange}
							onBlur={handleBlur}
							disabled={!settings.attestation}
						/>
					</div>
					<div className="flex flex-col">
						{(errors.name && touched.name) ||
						(errors.about && touched.about) ||
						(errors.date_start && touched.date_start) ||
						(errors.date_end && touched.date_end) ||
						(errors.reg_end && touched.reg_end) ||
						(errors.reg_start && touched.reg_start) ? (
							<span className="text-red-700">
								Заполните все необходимые поля!
							</span>
						) : null}
					</div>
					<div className="flex flex-row gap-4">
						<button
							className="w-full transition-all duration-200 font-semibold rounded-md p-1 enabled:hover:bg-sky-400 enabled:bg-sky-500 disabled:bg-sky-200 text-lg text-white"
							type="submit"
							disabled={
								!(
									!errors.name &&
									!errors.about &&
									!errors.date_end &&
									!errors.date_start &&
									!errors.reg_start &&
									!errors.reg_end
								)
							}
						>
							Создать
						</button>
						<button
							className="w-full transition-all duration-200 font-semibold rounded-md p-1 hover:bg-slate-300 bg-slate-500 text-white text-lg"
							type="button"
							onClick={() => navigate(`/events/upcoming`)}
						>
							Отменить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddEvent
