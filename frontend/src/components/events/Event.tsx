import { useParams, NavLink } from "react-router-dom"
import {
	useGetEventBySlugQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"
import { TbPlus, TbSettings } from "react-icons/tb"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { monthes } from "../../store/types/events"
import { useState } from "react"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile, RanksKey, ranks } from "../../store/types/profile"
import { RxCross2 } from "react-icons/rx"

interface EventProps {
	profile: IProfile
	isAuthenicated: boolean
}

function Event({ profile, isAuthenicated }: EventProps) {
	const { slug } = useParams()

	const [settings, setSettings] = useState({
		view: false,
		edit: false,
	})

	const { data: event, isLoading } = useGetEventBySlugQuery(slug ? slug : "")
	const { data: groupsInfo } = useGetTrainerGroupsQuery(1)
	const [activeGroup, setActiveGroup] = useState(groupsInfo?.results[0]?.slug)
	const {
		data: group,
		isLoading: groupIsLoading,
		error,
	} = useGetTrainerGroupQuery({
		slug: activeGroup ? activeGroup : "",
		page: 1,
	})

	console.log(error)

	const [showList, setShowList] = useState(false)

	function getCorrectDate(date: string) {
		const arr = date.split("-")

		const time = arr[2].split("T").length > 1 ? arr[2].split("T")[1] : ""

		type ObjectKey = keyof typeof monthes

		return (
			[
				time
					? arr[2][0] === "0"
						? arr[2][1]
						: arr[2].slice(0, 2)
					: arr[2][0] === "0"
					? arr[2][1]
					: arr[2],
				monthes[arr[1] as ObjectKey],
				arr[0],
			].join(" ") + (time ? `, ${time.slice(0, 5)}` : "")
		)
	}

	function haveAccessRole(accessRoles: string[]) {
		// for (let index = 0; index < profile.roles.length; index++) {
		// 	if (accessRoles.includes(profile.roles[index].name)) {
		// 		return true
		// 	}
		// }

		return true
	}

	return (
		<div className="relative flex h-full w-full">
			{event && !isLoading ? (
				<>
					<div className="relative top-0 left-0 right-0 bottom-0 rounded-md p-1 w-[34rem] border-2 border-sky-700 m-auto mt-4">
						<div className="m-1 font-medium text-size text-lg flex flex-row">
							{event?.name}
							<div className="flex-1" />
							{isAuthenicated &&
							haveAccessRole(["Тренер", "Руководитель"]) ? (
								<NavLink
									to={`/events/${slug}/edit`}
									className="items-center justify-center"
								>
									<TbSettings className="h-6 w-6" />
								</NavLink>
							) : null}
						</div>
						<hr className="bg-sky-700 -mx-1 my-1 h-0.5" />
						<div className="m-1">
							<span className="font-medium">
								Мероприятие проходит:
							</span>{" "}
							{getCorrectDate(event.date_start)}
							{event.date_start !== event.date_end
								? " - " + getCorrectDate(event.date_end)
								: null}
						</div>
						<div className="m-1">
							<span className="font-medium">Регистрация:</span>{" "}
							{getCorrectDate(event.reg_start)}
							{event.reg_start !== event.reg_end
								? " - " + getCorrectDate(event.reg_end)
								: null}
						</div>
						<hr className="bg-white mx-1 my-1" />
						<div className="m-1">
							<span className="font-medium">Семинар: </span>
							{event.is_seminar && event.seminar_date ? (
								getCorrectDate(event.seminar_date)
							) : (
								<span className="text-red-700">
									отсутствует
								</span>
							)}
						</div>
						<div className="m-1">
							<span className="font-medium">Аттестация: </span>
							{event.is_attestation && event.attestation_date ? (
								getCorrectDate(event.attestation_date)
							) : (
								<span className="text-red-700">
									отсутствует
								</span>
							)}
						</div>
						<hr className="bg-white mx-1 my-1" />
						<div className="m-1">
							<span className="font-medium">О мероприятии:</span>
							<div>{event.about}</div>
						</div>
						{isAuthenicated && haveAccessRole(["Тренер", "Руководитель"]) ? (
							<>
								<hr className="bg-white mx-1 my-1" />
								<div className="flex justify-center">
									<button
										className="m-1 bg-sky-700 hover:bg-sky-500 font-semibold rounded-md p-1 h-9 text-white transition-all duration-200"
										type="button"
										onClick={() => {
											setSettings((prev) => ({
												...prev,
												view: true,
											}))
										}}
									>
										Посмотреть зарегистрированных участников
									</button>
								</div>
							</>
						) : null}
					</div>
					<div
						className={`${
							settings.view
								? "bg-opacity-30"
								: "hidden bg-opacity-0"
						} transition-all duration-200 z-8 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-sky-700 text-white`}
					>
						<div
							className={`z-9 bg-sky-700 relative flex flex-col items-center rounded-xl px-8 py-7 transition-all duration-200 ${
								settings.view ? "opacity-100" : "opacity-0"
							} w-[30rem]`}
						>
							<label className="font-bold text-2xl">
								Участники
							</label>
							<div className="border-y-2 border-sky-300 mt-2 p-1 border-opacity-30 flex felx-row gap-2 w-full">
								{groupsInfo?.results.map((group, index) => (
									<span
										key={index}
										className={`font-medium rounded p-0.5 transition-all duration-200 ${
											group.slug === activeGroup
												? "bg-white text-sky-700"
												: "hover:bg-sky-500"
										} cursor-pointer`}
										onClick={() =>
											setActiveGroup(group.slug)
										}
									>
										{group.name}
									</span>
								))}
							</div>
							<RxCross2
								className="h-6 w-6 absolute right-2 top-2 cursor-pointer"
								onClick={() =>
									setSettings((prev) => ({
										...prev,
										view: false,
									}))
								}
							/>
							<div className="transition-all duration-200 scrollbar-hide border-2 border-white h-[25rem] w-full rounded-md mt-4 p-2 flex flex-col gap-2">
								{group?.results[0]?.groupmember_set?.map(
									(member, index) => {
										return event.members?.includes(
											member.id
										) ? (
											<span
												key={index}
												className="border-b-2 border-white pb-0.5 flex flex-row items-center"
											>
												{/* <div className="flex justify-center items-center">
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
										</div> */}
												<span className="flex-1">
													{member.last_name}{" "}
													{member.first_name[0]}.{" "}
													{member.mid_name[0]}.
												</span>
												<span
													className={`font-medium ${
														ranks[
															member.rank as RanksKey
														].textColor
													} rounded-md bg-${
														ranks[
															member.rank as RanksKey
														].bgColor
													} ${
														ranks[
															member.rank as RanksKey
														].bgColor
													} w-20 p-0.5 flex justify-center items-center`}
												>
													{
														ranks[
															member.rank as RanksKey
														].text
													}
												</span>
												<div className="flex-1" />
											</span>
										) : null
									}
								)}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className="font-semibold text-lg top-0 left-0 bottom-0 right-0 mt-0 m-auto">
					Идет загрузка
				</div>
			)}
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
		isAuthenicated: state.authentication.isAuthenticated,
	}
}

export default connect(mapStateToProps, {})(Event)
