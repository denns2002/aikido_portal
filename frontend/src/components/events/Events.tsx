import { useState } from "react"
import { useGetEventsQuery } from "../../store/apis"
import EventCard from "./EventCard"
import { NavLink } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profiles"

interface EventsProps {
	profile: IProfile
	isAuthenticated: boolean
}

function Events({ profile, isAuthenticated }: EventsProps) {
	const { data, isLoading } = useGetEventsQuery(1)

	function haveAccessRole(accessRoles: string[]) {
		// for (let index = 0; index < profile.roles.length; index++) {
		// 	if (accessRoles.includes(profile.roles[index].name)) {
		// 		return true
		// 	}
		// }

		return true
	}

	return isLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="h-full w-full flex flex-col items-center">
			<div className="flex flex-col">
				<span className="border-l-4 border-sky-700 px-1 text-lg font-semibold">
					Ближайшие мероприятия
				</span>
				<div className="flex flex-row flex-wrap gap-6 mt-6">
					<EventCard
						event={{
							slug: "/",
							about: "Абоба",
							name: "XI Центральный семинар по прикладному айкидо",
							date_start: "2023-01-01",
							date_end: "2023-01-01",
							reg_start: "2023-01-01",
							reg_end: "2023-01-01",
						}}
					/>
					<EventCard
						event={{
							slug: "/",
							about: "Абоба",
							name: "XI Центральный семинар по прикладному айкидо",
							date_start: "2023-01-01",
							date_end: "2023-01-01",
							reg_start: "2023-01-01",
							reg_end: "2023-01-01",
						}}
					/>
					<EventCard
						event={{
							slug: "/",
							about: "Абоба",
							name: "XI Центральный семинар по прикладному айкидо",
							date_start: "2023-01-01",
							date_end: "2023-01-01",
							reg_start: "2023-01-01",
							reg_end: "2023-01-01",
						}}
					/>
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<span className="border-l-4 border-sky-700 px-1 text-lg font-semibold">
					Прошедшие мероприятия
				</span>
				<div className="flex flex-row flex-wrap gap-6 mt-6">
					<EventCard
						event={{
							slug: "/",
							about: "Абоба",
							name: "XI Центральный семинар по прикладному айкидо",
							date_start: "2023-01-01",
							date_end: "2023-01-01",
							reg_start: "2023-01-01",
							reg_end: "2023-01-01",
						}}
					/>
					<EventCard
						event={{
							slug: "/",
							about: "Абоба",
							name: "XI Центральный семинар по прикладному айкидо",
							date_start: "2023-01-01",
							date_end: "2023-01-01",
							reg_start: "2023-01-01",
							reg_end: "2023-01-01",
						}}
					/>
					<EventCard
						event={{
							slug: "/",
							about: "Абоба",
							name: "XI Центральный семинар по прикладному айкидо",
							date_start: "2023-01-01",
							date_end: "2023-01-01",
							reg_start: "2023-01-01",
							reg_end: "2023-01-01",
						}}
					/>
				</div>
			</div>
		</div>
	)
}

function mapStateProps(state: IRootState) {
	return {
		profile: state.profile.profile,
		isAuthenticated: state.authentication.isAuthenticated,
	}
}

export default connect(mapStateProps, {})(Events)
