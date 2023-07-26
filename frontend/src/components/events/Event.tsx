import { useParams, NavLink, useLocation } from "react-router-dom"
import {
	useGetEventBySlugQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"
import { TbArrowNarrowLeft, TbPhotoCancel, TbSettings } from "react-icons/tb"
import { useState } from "react"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profiles"
import { IEvent } from "../../store/types"
import { getCorrectDate, openInNewTab } from "../../functions"
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

	const event: IEvent = {
		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
		name: "XI Центральный семинар по прикладному айкидо",
		date_start: "2023-01-02",
		date_end: "2023-01-03",
		reg_start: "2023-01-01",
		reg_end: "2023-01-01",
	}

	return slug === "upcoming-test" ? (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения: {getCorrectDate(event?.date_start)} -{" "}
					{getCorrectDate(event?.date_end)}
				</span>
				<span className="text-white font-bold text-base">
					Регистрация: {getCorrectDate(event?.reg_start)} -{" "}
					{getCorrectDate(event?.reg_end)}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4">
				<div className="w-full flex flex-col gap-4 mb-4">
					<Dropdown title="Описание" defaultShow={false}>
						<>{event.about}</>
					</Dropdown>
					<Dropdown title="Программа" defaultShow={true}>
						<>{"..."}</>
					</Dropdown>
					<Dropdown title="Место провидения" defaultShow={true}>
						<>{"..."}</>
					</Dropdown>
					<Dropdown title="Контакты" defaultShow={false}>
						<>{"..."}</>
					</Dropdown>
				</div>
				<div className="flex flex-row mt-4 gap-4">
					<button
						className="p-1 bg-sky-900 hover:bg-sky-800 transition-all duration-300 text-white rounded-md text-lg font-medium flex-1"
						onClick={() =>
							openInNewTab(`${location.pathname}/participants`)
						}
					>
						Посмотреть участников
					</button>
					<button
						className="p-1 bg-sky-900 hover:bg-sky-800 transition-all duration-300 text-white rounded-md text-lg font-medium flex-1"
						onClick={() =>
							openInNewTab(`${location.pathname}/application`)
						}
					>
						Изменить заявку
					</button>
				</div>
				<button className="mt-4 p-1 px-4 bg-slate-600 hover:bg-slate-500 text-white transition-all duration-300 rounded-md text-lg font-medium flex-1"
				>
					Редактировать мероприятие
				</button>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex flex-col items-center -mt-[2rem] relative">
			<div className="w-full bg-sky-500 p-5 pl-[20%] flex flex-col">
				<h1 className="text-white font-bold text-3xl">{event?.name}</h1>
				<span className="text-white font-bold text-base">
					Даты проведения: {getCorrectDate(event?.date_start)} -{" "}
					{getCorrectDate(event?.date_end)}
				</span>
			</div>
			<div className="w-[50rem] flex flex-col mt-4">
				<div className="w-full flex flex-col gap-4 mb-4">
					<Dropdown title="Описание" defaultShow={false}>
						<>{event.about}</>
					</Dropdown>
					<Dropdown title="Программа" defaultShow={true}>
						<>{"..."}</>
					</Dropdown>
					<Dropdown title="Место провидения" defaultShow={true}>
						<>{"..."}</>
					</Dropdown>
					<Dropdown title="Контакты" defaultShow={false}>
						<>{"..."}</>
					</Dropdown>
				</div>
				<div className="flex flex-row mt-4 gap-4">
					<button
						className="p-1 bg-sky-900 hover:bg-sky-800 transition-all duration-300 text-white rounded-md text-lg font-medium flex-1"
						onClick={() =>
							openInNewTab(`${location.pathname}/participants`)
						}
					>
						Посмотреть участников
					</button>
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
