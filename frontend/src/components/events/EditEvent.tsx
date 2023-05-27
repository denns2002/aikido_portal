import { FormEvent, useState } from "react"
import {
	useGetEventBySlugQuery,
	usePatchEventBySlugMutation,
} from "../../store/apis"
import { IEvent } from "../../store/types/events"
import { useParams } from "react-router-dom"
import Input from "../forms/Input"
import TextArea from "../forms/TextArea"
import { IInputAttributes } from "../../store/types/components"

function EditEvent() {
	const { slug } = useParams()

	const { data: event, isLoading } = useGetEventBySlugQuery(slug ? slug : "")
	const [addEvent, { error }] = usePatchEventBySlugMutation()

	console.log(error)

	const [settings, setSettings] = useState(
		event
			? {
					seminar: event.is_seminar,
					attestation: event.is_attestation,
					members: false,
			  }
			: {
					seminar: false,
					attestation: false,
					members: false,
			  }
	)

	// function getCorrectDate(date: string): string {
	//     let newDate = date.slice(0, 16)

	//     let arr = newDate.split(":")

	//     arr[arr.length - 1] = arr[arr.length - 1].t

	//     return ""
	// }

	const [inputsValues, setInputValues] = useState<IEvent>(
		event
			? {
					...event,
					attestation_date: event.attestation_date
						? event.attestation_date.slice(0, 16)
						: "",
					seminar_date: event.seminar_date
						? event.seminar_date.slice(0, 16)
						: "",
			  }
			: {
					name: "",
					about: "",
					reg_start: "",
					reg_end: "",
					date_end: "",
					date_start: "",
			  }
	)

	console.log(inputsValues)

	const [touched, setTouched] = useState({
		name: false,
		about: false,
		reg_start: false,
		reg_end: false,
		date_end: false,
		date_start: false,
	})

	const [errors, setErrors] = useState({
		name: "",
		about: "",
		reg_start: "",
		reg_end: "",
		date_end: "",
		date_start: "",
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

		if (!settings.seminar) {
			setInputValues((prev) => {
				delete prev.seminar_date

				return prev
			})
		}
		if (!settings.attestation) {
			setInputValues((prev) => {
				delete prev.attestation_date

				return prev
			})
		}

		await addEvent({ slug: slug ? slug : "", event: inputsValues }).unwrap()
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
	}

	function handleBlur(
		event:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		setTouched({ ...touched, [event.target.name]: true })
	}

	return (
		<div className="flex h-full w-full">
			<div className="border-2 border-sky-700 relative top-0 left-0 bottom-0 right-0 m-auto flex flex-col items-center rounded-xl px-8 py-7">
				<label className="font-bold text-2xl">
					Редактировать мероприятие
				</label>
				<form
					className="flex flex-col gap-2 mt-6 w-[30rem]"
					onSubmit={handleSubmit}
				>
					<Input
						{...formInputs[0]}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={[errors.name]}
					/>
					<div className="border-b-2 border-sky-700 w-24">
						Регистрация:
					</div>
					<div className="flex flex-row gap-4">
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
					<div className="border-b-2 border-sky-700 w-36">
						Время проведения:
					</div>
					<div className="flex flex-row gap-4">
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
					<TextArea
						{...formInputs[5]}
						onChange={handleChange}
						onBlur={handleBlur}
						errors={[errors.about]}
					/>
					<div className="flex flex-row gap-4">
						<button
							className={`${
								settings.seminar
									? "bg-green-500 hover:bg-green-300"
									: "bg-slate-500 hover:bg-slate-300"
							} flex-1 font-semibold rounded-md p-1 h-9 text-white`}
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
										seminar_date: event?.seminar_date
										? event.seminar_date.slice(0, 16)
										: "",
									}))
								} else {
									setInputValues((prev) => ({
										...prev,
										is_seminar: false,
										seminar_date: ""
									}))
								}
							}}
						>
							Семинар
						</button>
						<button
							className={`${
								settings.attestation
									? "bg-green-500 hover:bg-green-300"
									: "bg-slate-500 hover:bg-slate-300"
							} flex-1 font-semibold rounded-md p-1 h-9 text-white`}
							type="button"
							onClick={() => {
								setSettings((prev) => ({
									...prev,
									attestation: !prev.attestation,
								}))

								if (!settings.seminar) {
									setInputValues((prev) => ({
										...prev,
										is_attestation: true,
										attestation_date: event?.attestation_date
										? event.attestation_date.slice(0, 16)
										: "",
									}))
								} else {
									setInputValues((prev) => ({
										...prev,
										is_attestation: false,
										attestation_date: ""
									}))
								}
							}}
						>
							Аттестация
						</button>
						<button
							className="bg-sky-700 hover:bg-sky-500 flex-1 font-semibold rounded-md p-1 h-9 text-white"
							type="button"
							onClick={() => {
								setSettings((prev) => ({
									...prev,
									members: !prev.members,
								}))

								// if (!settings.seminar) {
								// 	setInputValues((prev) => ({
								// 		...prev,
								// 		is_seminar: true,
								// 	}))
								// } else {
								// 	setInputValues((prev) => ({
								// 		...prev,
								// 		is_seminar: false,
								// 	}))
								// }
							}}
						>
							Участники
						</button>
					</div>
					<div className={`border-b-2 w-[5.4rem] ${settings.seminar ? "border-sky-700" : "border-slate-300 text-slate-300"}`}>
						Семинар:
					</div>
					<Input
						{...formInputs[6]}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={!settings.seminar}
						errors={[errors.reg_start]}
					/>
					<div className={`border-b-2 w-[5.4rem] ${settings.attestation ? "border-sky-700" : "border-slate-300 text-slate-300"}`}>
						Аттестация:
					</div>
					<Input
						{...formInputs[7]}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={!settings.attestation}
						errors={[errors.reg_start]}
					/>
					<div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="font-semibold rounded-md p-1 w-28 h-9 mt-2 enabled:hover:bg-sky-300 enabled:bg-sky-500 disabled:bg-sky-100 text-white"
							type="submit"
						>
							Сохранить
						</button>
						<button
							className="font-semibold rounded-md p-1 w-28 h-9 mt-2 hover:bg-red-300 bg-red-500 text-white"
							type="submit"
						>
							Отменить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditEvent
