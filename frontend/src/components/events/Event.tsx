import { useParams, NavLink } from "react-router-dom"
import {
	useGetEventBySlugQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"
import { TbSettings } from "react-icons/tb"
import { RiDeleteBinFill } from "react-icons/ri"
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"
import { monthes } from "../../store/types/events"
import { useState } from "react"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profile"

interface EventProps {
	profile: IProfile
	isAuthenicated: boolean
}

function Event({ profile, isAuthenicated }: EventProps) {
	const { slug } = useParams()

	const { data: event, isLoading } = useGetEventBySlugQuery(slug ? slug : "")
	const { data: groupsInfo } = useGetTrainerGroupsQuery(1)
	const [activeGroup, setActiveGroup] = useState(groupsInfo?.results[0]?.slug)
	const { data: group, isLoading: groupIsLoading } = useGetTrainerGroupQuery({
		slug: activeGroup ? activeGroup : "",
		page: 1,
	})

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
						: arr[2].slice(0, 1)
					: arr[2][0] === "0"
					? arr[2][1]
					: arr[2],
				monthes[arr[1] as ObjectKey],
				arr[0],
			].join(" ") + (time ? `, ${time.slice(0, 5)}` : "")
		)
	}

	function haveAccessRole(accessRoles: string[]) {
		for (let index = 0; index < profile.roles.length; index++) {
			if (accessRoles.includes(profile.roles[index].name)) {
				return true
			}
		}

		return false
	}

	return (
		<div className="relative">
			{event && !isLoading ? (
				<div className="rounded-md p-1 w-[30rem] border-2 border-sky-700 mt-4">
					<div className="m-1 font-medium text-size text-lg flex flex-row">
						{event?.name}
						<div className="flex-1" />
						{isAuthenicated && haveAccessRole(["Тренер", "Руководитель"]) ? (
								<NavLink
									to={`/events/${slug}/edit`}
									className="items-center justify-center"
								>
									<TbSettings className="h-6 w-6" />
								</NavLink>
						) : null}
					</div>
					<hr className="bg-white mx-1 my-1" />
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
					<div className="m-1">
						<span className="font-medium">Семинар: </span>
						{event.is_seminar && event.seminar_date ? (
							getCorrectDate(event.seminar_date)
						) : (
							<span className="text-red-700">отсутствует</span>
						)}
					</div>
					<div className="m-1">
						<span className="font-medium">Аттестация: </span>
						{event.is_attestation && event.attestation_date ? (
							getCorrectDate(event.attestation_date)
						) : (
							<span className="text-red-700">отсутствует</span>
						)}
					</div>
					<div className="m-1">
						<span className="font-medium">О мероприятии:</span><div>{event.about}</div>
					</div>
					{isAuthenicated && haveAccessRole(["Тренер"]) ? (
						<>
							<div
								className="flex flex-row ms-1 mb-1 mr-1 cursor-pointer"
								onClick={() => setShowList((prev) => !prev)}
							>
								<span className="font-medium">
									Cписок участвующих учеников
								</span>
								<div className="flex justify-center items-center">
									{showList ? (
										<IoMdArrowDropup className="bg-white text-black" />
									) : (
										<IoMdArrowDropdown className="bg-white text-black" />
									)}
								</div>
							</div>
							{showList ? (
								<>
									<div className="border-y-2 border-slate-400 mx-1 mt-2 p-1 border-opacity-30 flex felx-row gap-2">
										{groupsInfo?.results.map(
											(group, index) => (
												<span
													key={index}
													className={`font-medium rounded p-0.5 transition-all duration-200 ${
														group.slug ===
														activeGroup
															? "bg-sky-500 text-white"
															: "hover:bg-sky-300"
													} cursor-pointer`}
													onClick={() =>
														setActiveGroup(
															group.slug
														)
													}
												>
													{group.name}
												</span>
											)
										)}
									</div>
									{groupIsLoading ? (<div>Идет загрузка</div>) :
									(<div className="transition-all duration-200 scrollbar-hide h-auto max-h-[25rem] w-full rounded-md p-2 flex flex-col gap-2 scrollbar-hide overflow-auto">
										{group?.results[0]?.groupmember_set?.map(
											(member, index) => {
												return event.members?.includes(
													member.id
												) ? (
													<span
														key={index}
														className="border-b-2 border-slate-400 border-opacity-100 pb-0.5 flex flex-row-reverse"
													>
														<span className="flex-1">
															{member.last_name}{" "}
															{
																member
																	.first_name[0]
															}
															.{" "}
															{member.mid_name[0]}
															.
														</span>
													</span>
												) : null
											}
										)}
									</div>)}
								</>
							) : null}
						</>
					) : null}
				</div>
			) : (
				<div>Идет загрузка</div>
			)}
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
		isAuthenicated: state.authentication.isAuthenticated
	}
}

export default connect(mapStateToProps, {})(Event)
