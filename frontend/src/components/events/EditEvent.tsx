import { FormEvent, useState } from "react"
import {
	useDeleteEventBySlugMutation,
	useGetEventBySlugQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
	usePatchEventBySlugMutation,
} from "../../store/apis"
import { IEvent } from "../../store/types/events"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../forms/Input"
import TextArea from "../forms/TextArea"
import { IInputAttributes } from "../../store/types/components"
import { ITrainerGroupMembers } from "../../store/types/groups"
import { RxCross2 } from "react-icons/rx"
import { TbPlus } from "react-icons/tb"

function EditEvent() {
	const { slug } = useParams()

	const { data: event, isLoading } = useGetEventBySlugQuery(slug ? slug : "")

	const [addEvent, { error, isSuccess, status }] =
		usePatchEventBySlugMutation()

	const [deleteEvent, {}] = useDeleteEventBySlugMutation()

	const [deleteEventConfirm, setDeleteEventConfirm] = useState(false)

	const navigate = useNavigate()

	const [settings, setSettings] = useState(
		event
			? {
					seminar: event.is_seminar,
					attestation: event.is_attestation,
			  }
			: {
					seminar: false,
					attestation: false,
			  }
	)

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
					members: structuredClone(event.members),
			  }
			: {
					name: "",
					about: "",
					reg_start: "",
					reg_end: "",
					date_end: "",
					date_start: "",
					address: "",
			  }
	)

	console.log(inputsValues, event)

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
		name: "",
		about: "",
		reg_start: "",
		reg_end: "",
		date_end: "",
		date_start: "",
		address: ",",
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

		navigate(`/events/${slug}`)
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
					Редактировать мероприятие
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
										seminar_date: event?.seminar_date
											? event.seminar_date.slice(0, 16)
											: "",
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
										attestation_date:
											event?.attestation_date
												? event.attestation_date.slice(
														0,
														16
												  )
												: "",
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
					<div className="w-full flex flex-row gap-4 mt-8">
						<button
							className="w-full transition-all duration-200 font-semibold rounded-md p-1 enabled:hover:bg-sky-300 enabled:bg-sky-500 disabled:bg-sky-200 text-lg text-white"
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
							Сохранить
						</button>
						<button
							className="w-full transition-all duration-200 font-semibold rounded-md p-1 hover:bg-slate-300 bg-slate-500 text-white text-lg"
							type="button"
							onClick={() => navigate(`/events/${slug}`)}
						>
							Отменить
						</button>
						<button
							className="w-full transition-all duration-200 font-semibold rounded-md p-1 hover:bg-red-300 bg-red-500 text-white text-lg"
							type="button"
							onClick={() => setDeleteEventConfirm(true)}
						>
							Удалить
						</button>
					</div>
				</form>
			</div>
			<div
				className={`${
					deleteEventConfirm ? "bg-opacity-30" : "hidden bg-opacity-0"
				} transition-all duration-200 z-8 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-sky-700 text-white`}
			>
				<div
					className={`z-9 bg-slate-500 relative flex flex-col items-center rounded-xl px-8 py-7 transition-all duration-200 ${
						deleteEventConfirm ? "opacity-100" : "opacity-0"
					} w-[20rem]`}
				>
					<span className="font-medium text-lg">
						Удалить мероприятие?
					</span>
					<div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 bg-red-500 hover:bg-red-300 text-white"
							type="submit"
							onClick={async () => {
								await deleteEvent(slug ? slug : "").unwrap()

								navigate("/events")
							}}
						>
							Да
						</button>
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 bg-white hover:bg-slate-300 text-black"
							type="button"
							onClick={() => setDeleteEventConfirm(false)}
						>
							Нет
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditEvent
