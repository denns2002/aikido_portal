import { useState } from "react"
import { useGetEventsQuery } from "../../store/apis"
import EventCard from "./EventCard"

function Events() {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useGetEventsQuery(page)

	console.log(data)

	function getPages(count: number): number[] {
		let pages = []

		for (let i = 1; i <= count; i++) {
			pages.push(i)
		}

		return pages
	}

	return isLoading ? (
		<div>Идет загрузка</div>
	) : (
		<div className="flex flex-col gap-1 h-full w-full items-center">
			{data?.results.map((event, index) => {
				return (
					<EventCard
						key={index}
						event={event}
					/>
				)
			})}
			<div className="flex-1" />
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
			) : null}
		</div>
	)
}

export default Events
