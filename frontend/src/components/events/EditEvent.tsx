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
	const { data: groupsInfo } = useGetTrainerGroupsQuery(1)
	const [activeGroup, setActiveGroup] = useState(groupsInfo?.results[0]?.slug)
	const { data: group, isLoading: groupIsLoading } = useGetTrainerGroupQuery({
		slug: activeGroup ? activeGroup : "",
		page: 1,
	})

	const [delEvent, {}] = useDeleteEventBySlugMutation()

	const [deleteEvent, setDeleteEvent] = useState(false)

	const navigate = useNavigate()

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
			  }
	)

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
		<div className="relative flex h-full w-full">
			<div className="z-5 border-2 border-sky-700 relative top-0 left-0 bottom-0 right-0 m-auto flex flex-col items-center rounded-xl px-8 py-7">
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
							} flex-1 font-semibold rounded-md p-1 h-9 text-white transition-all duration-200`}
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
									? "bg-green-500 hover:bg-green-300"
									: "bg-slate-500 hover:bg-slate-300"
							} flex-1 font-semibold rounded-md p-1 h-9 text-white transition-all duration-200`}
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
						<button
							className="bg-sky-700 hover:bg-sky-500 flex-1 font-semibold rounded-md p-1 h-9 text-white transition-all duration-200"
							type="button"
							onClick={() => {
								setSettings((prev) => ({
									...prev,
									members: !prev.members,
								}))
							}}
						>
							Участники
						</button>
					</div>
					<div
						className={`border-b-2 w-[4.4rem] ${
							settings.seminar
								? "border-sky-700"
								: "border-slate-300 text-slate-300"
						}`}
					>
						Семинар:
					</div>
					<Input
						{...formInputs[6]}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={!settings.seminar}
					/>
					<div
						className={`border-b-2 w-[5.4rem] ${
							settings.attestation
								? "border-sky-700"
								: "border-slate-300 text-slate-300"
						}`}
					>
						Аттестация:
					</div>
					<Input
						{...formInputs[7]}
						onChange={handleChange}
						onBlur={handleBlur}
						disabled={!settings.attestation}
					/>
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
					<div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 enabled:hover:bg-sky-300 enabled:bg-sky-500 disabled:bg-sky-100 text-white"
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
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 hover:bg-slate-300 bg-slate-500 text-white"
							type="button"
							onClick={() => navigate(`/events/${slug}`)}
						>
							Отменить
						</button>
					</div>
					<div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 hover:bg-red-300 bg-red-500 text-white"
							type="button"
							onClick={() => setDeleteEvent(true)}
						>
							Удалить
						</button>
					</div>
				</form>
			</div>
			<div
				className={`${
					deleteEvent ? "bg-opacity-30" : "hidden bg-opacity-0"
				} transition-all duration-200 z-8 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-sky-700 text-white`}
			>
				<div
					className={`z-9 bg-slate-500 relative flex flex-col items-center rounded-xl px-8 py-7 transition-all duration-200 ${
						deleteEvent ? "opacity-100" : "opacity-0"
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
								await delEvent(slug ? slug : "").unwrap()

								navigate("/events")
							}}
						>
							Да
						</button>
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 bg-white hover:bg-slate-300 text-black"
							type="button"
							onClick={() => setDeleteEvent(false)}
						>
							Нет
						</button>
					</div>
				</div>
			</div>
			<div
				className={`${
					settings.members ? "bg-opacity-30" : "hidden bg-opacity-0"
				} transition-all duration-200 z-8 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-sky-700 text-white`}
			>
				<div
					className={`z-9 bg-sky-700 relative flex flex-col items-center rounded-xl px-8 py-7 transition-all duration-200 ${
						settings.members ? "opacity-100" : "opacity-0"
					} w-[30rem]`}
				>
					<label className="font-bold text-2xl">Участники</label>
					<div className="border-y-2 border-sky-300 mt-2 p-1 border-opacity-30 flex felx-row gap-2 w-full">
						{groupsInfo?.results.map((group, index) => (
							<span
								key={index}
								className={`font-medium rounded p-0.5 transition-all duration-200 ${
									group.slug === activeGroup
										? "bg-white text-sky-700"
										: "hover:bg-sky-500"
								} cursor-pointer`}
								onClick={() => setActiveGroup(group.slug)}
							>
								{group.name}
							</span>
						))}
					</div>
					<RxCross2
						className="h-6 w-6 absolute right-2 top-2 cursor-pointer"
						onClick={() =>
							setSettings((prev) => ({ ...prev, members: false }))
						}
					/>
					<div className="transition-all duration-200 scrollbar-hide border-2 border-white h-[25rem] w-full rounded-md mt-4 p-2 flex flex-col gap-2">
					{group?.results[0]?.groupmember_set?.map(
							(member, index) => (
								<span
									key={index}
									className="border-b-2 border-white pb-0.5 flex flex-row-reverse items-center"
								>
									<div className="flex justify-center items-center">
										{inputsValues?.members?.includes(
											member.id
										) ? (
											<RxCross2
												className="h-5 w-5 rounded-full text-white bg-red-700 cursor-pointer"
												onClick={() =>
													setInputValues((prev) => {
														const newMembers =
															prev.members?.filter(
																(id) =>
																	id !==
																	member.id
															)

														return {
															...prev,
															members: newMembers,
														}
													})
												}
											/>
										) : (
											<TbPlus
												className="h-5 w-5 rounded-full bg-white text-sky-700 cursor-pointer"
												onClick={() =>
													setInputValues((prev) => {
														prev.members?.push(
															member.id
														)

														return { ...prev }
													})
												}
											/>
										)}
									</div>
									<div className="flex-1" />
									{/* <span
										className={`font-medium ${
											ranks[member.rank as RanksKey]
												.textColor
										} rounded-md bg-${
											ranks[member.rank as RanksKey]
												.bgColor
										} ${
											ranks[member.rank as RanksKey]
												.bgColor
										} w-20 p-0.5 flex justify-center items-center`}
									>
										{ranks[member.rank as RanksKey].text}
									</span> */}
									<span className="flex-1">
										{member.last_name}{" "}
										{member.first_name[0]}.{" "}
										{member.mid_name[0]}.
									</span>
								</span>
							)
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditEvent
