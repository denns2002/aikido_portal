import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import EventCard from "./EventCard"
import { useGetEventBySlugQuery, useGetEventsByFilterQuery } from "../../store/apis"
import { IProfile } from "../../store/types"
import { HiPlus } from "react-icons/hi"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import EventsListCard from "./EventsListCard"
import { getDateFilter } from "../../functions"

interface EventsProps {
	profile: IProfile
	isAuthenticated: boolean
}

function UpcomingEvents({ profile, isAuthenticated }: EventsProps) {
	const [toggle, setToggle] = useState(false)

	const { data: events, isLoading } = useGetEventsByFilterQuery({filter: "date_end_gte", date: getDateFilter()})

	// const events = [
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-09-12",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	},
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-01-02",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	},
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-01-02",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	},
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-01-02",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	},
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-01-02",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	},
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-01-02",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	},
	// 	{
	// 		about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, consectetur! Aperiam accusamus assumenda error fugit! Debitis eius natus labore earum. Nisi harum laudantium, mollitia iure pariatur voluptatem quaerat fuga dolor dolorem aspernatur doloremque sed officiis exercitationem doloribus qui, at adipisci, minus officia! Adipisci animi dolores eaque molestias!",
	// 		name: "XI Центральный семинар по прикладному айкидо",
	// 		date_start: "2023-01-02",
	// 		date_end: "2023-01-03",
	// 		reg_start: "2023-01-01",
	// 		reg_end: "2023-01-01",
	// 		slug: "upcoming-test"
	// 	}
	// ]

	return isLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="h-full w-full flex flex-col items-center">
			<div className="w-[60rem] flex flex-col">
				<div className="relative">
					<span className="border-l-4 border-sky-700 px-1 text-3xl font-bold">
						Предстоящие мероприятия
					</span>
					<button
						className={`h-8 w-16 absolute bottom-0 right-0 rounded-full p-1 flex items-center transition-all duration-300 ${
							toggle ? "bg-sky-500" : "bg-slate-400"
						}`}
						onClick={() => setToggle((prev) => !prev)}
					>
						<div
							className={`h-6 w-6 rounded-full bg-white duration-500 ${
								toggle ? "translate-x-[2rem]" : null
							}`}
						/>
					</button>
				</div>
				<div className={`flex flex-row flex-wrap mt-6 ${toggle ? "gap-[3rem]" : "gap-4"}`}>
					{events?.results?.map((event, index) => {
						if (toggle) {
							return (
								<EventCard name={event.name} slug="upcoming-test" image="" />
							)
						} else {
							return (
								<EventsListCard key={index} event={event} />
							)
						}
					})}
				</div>
			</div>
			<NavLink
				to="/events/add"
				className="bg-white shadow-md group mt-[2rem] py-1 w-[60rem] flex flex-row justify-center items-center px-2 border-b-2 border-sky-500"
			>
				<span className="font-medium text-2xl">
					Добавить мероприятие:
				</span>
				<div className="flex-1" />
				<HiPlus className="bg-sky-500 group-hover:bg-sky-400 font-extrabold text-white h-7 w-7 rounded-md" />
			</NavLink>
		</div>
	)
}

function mapStateProps(state: IRootState) {
	return {
		profile: state.profile.profile,
		isAuthenticated: state.authentication.isAuthenticated,
	}
}

export default connect(mapStateProps, {})(UpcomingEvents)
