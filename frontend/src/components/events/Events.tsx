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
	const [page, setPage] = useState(1)
	const { data, isLoading } = useGetEventsQuery(page)

	function getPages(count: number): number[] {
		let pages = []

		for (let i = 1; i <= count; i++) {
			pages.push(i)
		}

		return pages
	}

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
		<div className="h-full w-full">
			<div className="flex flex-row gap-3 p-4 flex-wrap justify-center">
				{data?.results.map((event, index) => {
					return (
						<EventCard
							key={index}
							event={event}
						/>
					)
				})}
				{isAuthenticated && haveAccessRole(["Тренер", "Руководитель"]) ? (
					<NavLink
						to="/events/add"
						className="rounded-lg w-[30rem] h-[10.3rem] border-2 font-thin border-sky-700 text-sky-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200"
					>
						<div className="p-1 h-full w-full flex justify-center items-center">
							<CiCirclePlus className="h-24 w-24" />
						</div>
					</NavLink>
				) : null}
				{/* <div className="flex-1" />
				{data?.count ? (
					Math.floor(data?.count / 10) > 0 ? (
						<div className="flex flex-row gap-0.5">
							{getPages(Math.floor(data?.count / 10)).map(
								(number, index) => {
									return (
										<div
											key={index}
											className={`rounded-lg border-solid border-x-2  border-y-2 border-sky-700 ${page === number ? "bg-sky-700 text-white" : "bg-white"} px-1 cursor-pointer`}
											onClick={() => setPage(number)}
										>
											{number}
										</div>
									)
								}
							)}
						</div>
					) : null
				) : null} */}
			</div>
		</div>
	)
}

function mapStateProps(state: IRootState) {
	return {
		profile: state.profile.profile,
		isAuthenticated: state.authentication.isAuthenticated
	}
}

export default connect(mapStateProps, {})(Events)
