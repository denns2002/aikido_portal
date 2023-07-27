import { useState } from "react"
import { useGetEventsByFilterQuery, useGetEventsQuery } from "../../store/apis"
import EventCard from "./EventCard"
import { NavLink } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profiles"
import { getDateFilter } from "../../functions"

interface EventsProps {
	profile: IProfile
	isAuthenticated: boolean
}

function Events({ profile, isAuthenticated }: EventsProps) {
	const { data: upcomingEvents, isLoading: upcomingAreLoading } = useGetEventsByFilterQuery({filter: "date_end_gte", date: getDateFilter()})

	const { data: pastEvents, isLoading: pastAreLoading } = useGetEventsByFilterQuery({filter: "date_end_lte", date: getDateFilter()})

	return upcomingAreLoading || pastAreLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="h-full w-full flex flex-col items-center">
			<div className="flex flex-col">
				<h1 className="border-l-4 border-sky-700 px-1 text-3xl font-bold">
					Ближайшие мероприятия
				</h1>
				<div className="w-[60rem] flex flex-row flex-wrap gap-[3rem] mt-6">
					{upcomingEvents?.results?.slice(0, 3).map((event, index) => {
						return <EventCard key={index} slug={event?.slug ? event.slug : ""} name={event?.name ? event.name : ""} image="" />
					})}
				</div>
			</div>
			<div className="flex flex-col mt-8">
				<h1 className="border-l-4 border-sky-700 px-1 text-3xl font-bold">
					Последние мероприятия
				</h1>
				<div className="w-[60rem] flex flex-row flex-wrap gap-[3rem] mt-6">
					{pastEvents?.results?.slice(0, 3).map((event, index) => {
						return <EventCard key={index} slug={event?.slug ? event.slug : ""} name={event?.name ? event.name : ""} image="" />
					})}
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
