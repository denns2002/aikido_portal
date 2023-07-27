import { useParams, NavLink, useLocation } from "react-router-dom"
import {
	useGetEventBySlugQuery,
} from "../../store/apis"
import { TbArrowNarrowLeft, TbPhotoCancel, TbSettings } from "react-icons/tb"
import { useState } from "react"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profiles"
import { IEvent } from "../../store/types"
import { getCorrectDate, isEventOpen, isRegClosed, openInNewTab } from "../../functions"
import { IoIosArrowDown } from "react-icons/io"
import Modal from "../custom/Modal"
import Dropdown from "../custom/Dropdown"

interface EventProps {
	profile: IProfile
	isAuthenicated: boolean
}

function Event({ profile, isAuthenicated }: EventProps) {
	const location = useLocation()

	const { slug } = useParams()

	const { data: event } = useGetEventBySlugQuery(slug ? slug : "")

	// const event: IEvent = {
	// 	about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 	name: "XI Центральный семинар по прикладному айкидо",
	// 	date_start: "2023-01-02",
	// 	date_end: "2023-01-03",
	// 	reg_start: "2023-01-01",
	// 	reg_end: "2023-01-01",
	// }

	return isEventOpen(event?.date_end ? event.date_end : "") ? (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения:{" "}
					{getCorrectDate(event?.date_start ? event.date_start : "")}{" "}
					- {getCorrectDate(event?.date_end ? event.date_end : "")}
				</span>
				<span className={`${isRegClosed(event?.reg_end ? event.reg_end : "") ? "text-red-500" : "text-white"} font-bold text-base`}>
					Регистрация:{" "}
					{getCorrectDate(event?.reg_start ? event.reg_start : "")} -{" "}
					{getCorrectDate(event?.reg_end ? event.reg_end : "")}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4">
				<div className="w-full flex flex-col gap-4 mb-4">
					<Dropdown title="Описание" defaultShow={false}>
						<>{event?.about}</>
					</Dropdown>
					<Dropdown title="Программа" defaultShow={true}>
						<>
							{!event?.is_attestation && !event?.is_seminar ? (
								<span className="text-red-500">
									Не установлено
								</span>
							) : (
								<div className="flex flex-col gap-4">
									{event?.is_attestation ? (
										<>
											<span>
												<span className="font-medium">
													Аттестация:
												</span>{" "}
												{getCorrectDate(
													event?.attestation_date
														? event?.attestation_date
														: ""
												)}
											</span>
										</>
									) : null}
									{event?.is_seminar ? (
										<>
											<span>
												<span className="font-medium">
													Семинар:
												</span>{" "}
												{getCorrectDate(
													event?.seminar_date
														? event?.seminar_date
														: ""
												)}
											</span>
										</>
									) : null}
								</div>
							)}
						</>
					</Dropdown>
					<Dropdown title="Место провидения" defaultShow={true}>
						<>
							{event?.address ? (
								event.address
							) : (
								<span className="text-red-500">
									Не установлено
								</span>
							)}
						</>
					</Dropdown>
					<Dropdown title="Контакты" defaultShow={false}>
						<>{"..."}</>
					</Dropdown>
				</div>
				<div className="flex flex-row mt-4 gap-4">
					<NavLink
						to={`/events/${slug}/participants`}
						className="p-1 bg-sky-900 hover:bg-sky-800 transition-all duration-300 text-white rounded-md text-lg font-medium flex-1 text-center"
					>
						Посмотреть участников
					</NavLink>
					<NavLink
						to={`/events/${slug}/application`}
						className="p-1 bg-sky-900 hover:bg-sky-800 transition-all duration-300 text-white rounded-md text-lg font-medium flex-1 text-center"
					>
						Изменить заявку
					</NavLink>
				</div>
				<NavLink
					to={`/events/${slug}/edit`}
					className=" text-center mt-4 p-1 px-4 bg-slate-600 hover:bg-slate-500 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
				>
					Редактировать мероприятие
				</NavLink>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения:{" "}
					{getCorrectDate(event?.date_start ? event.date_start : "")}{" "}
					- {getCorrectDate(event?.date_end ? event.date_end : "")}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4">
				<div className="w-full flex flex-col gap-4 mb-4">
					<Dropdown title="Описание" defaultShow={false}>
						<>{event?.about}</>
					</Dropdown>
					<Dropdown title="Программа" defaultShow={true}>
						<>
							{!event?.is_attestation && !event?.is_seminar ? (
								<span className="text-red-500">
									Не установлено
								</span>
							) : (
								<div className="flex flex-col gap-4">
									{event?.is_attestation ? (
										<>
											<span>
												<span className="font-medium">
													Аттестация:
												</span>{" "}
												{getCorrectDate(
													event?.attestation_date
														? event?.attestation_date
														: ""
												)}
											</span>
										</>
									) : null}
									{event?.is_seminar ? (
										<>
											<span>
												<span className="font-medium">
													Семинар:
												</span>{" "}
												{getCorrectDate(
													event?.seminar_date
														? event?.seminar_date
														: ""
												)}
											</span>
										</>
									) : null}
								</div>
							)}
						</>
					</Dropdown>
					<Dropdown title="Место провидения" defaultShow={true}>
						<>
							{event?.address ? (
								event.address
							) : (
								<span className="text-red-500">
									Не установлено
								</span>
							)}
						</>
					</Dropdown>
					<Dropdown title="Контакты" defaultShow={false}>
						<>{"..."}</>
					</Dropdown>
				</div>
				<div className="flex flex-row mt-4 gap-4">
					<NavLink
						to={`/events/${slug}/participants`}
						className="p-1 bg-sky-900 hover:bg-sky-800 transition-all duration-300 text-white rounded-md text-lg font-medium flex-1 text-center"
					>
						Посмотреть участников
					</NavLink>
				</div>
			</div>
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
