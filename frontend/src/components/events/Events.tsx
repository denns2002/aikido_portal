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

	return isLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="h-full w-full flex flex-col items-center">
			<div className="flex flex-col">
				<span className="border-l-4 border-sky-700 px-1 text-3xl font-bold">
					Ближайшие мероприятия
				</span>
				<div className="w-[60rem] flex flex-row flex-wrap gap-[3rem] mt-6">
					<EventCard
                        slug="upcoming-test"
                        name="XI Центральный семинар по прикладному айкидо"
                        image=""
					/>
					<EventCard
                        slug="upcoming-test"
                        name="XI Центральный семинар по прикладному айкидо"
                        image=""
					/>
					<EventCard
                        slug="upcoming-test"
                        name="XI Центральный семинар по прикладному айкидо"
                        image=""
					/>
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<span className="border-l-4 border-sky-700 px-1 text-3xl font-bold">
					Последние мероприятия
				</span>
				<div className="w-[60rem] flex flex-row flex-wrap gap-[3rem] mt-6">
					<EventCard
                        slug="past-test"
                        name="XI Центральный семинар по прикладному айкидо"
                        image=""
					/>
					<EventCard
                        slug="past-test"
                        name="XI Центральный семинар по прикладному айкидо"
                        image=""
					/>
					<EventCard
                        slug="past-test"
                        name="XI Центральный семинар по прикладному айкидо"
                        image=""
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
