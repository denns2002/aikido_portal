import { useState } from "react"
import { useGetClubsQuery } from "../../store/apis"
import ClubCard from "./ClubCard"

function Clubs() {
	const { data, isLoading, error } = useGetClubsQuery(1)

	const [page, setPage] = useState(1)

	console.log(data, error)

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
			{data?.results.map((club, index) => {
				return (
					<ClubCard
						key={index}
						club={club}
					/>
				)
			})}
			<div className="flex-1" />
			{data?.count ? (
				Math.floor(data?.count / data.results.length) > 0 ? (
					<div className="flex flex-row gap-0.5">
						{getPages(Math.floor(data?.count / 10)).map(
							(number, index) => {
								return (
									<div
										key={index}
										className={`rounded-lg border-solid border-x-2  border-y-2 border-sky-700 ${
											page === number
												? "bg-sky-700 text-white"
												: "bg-white"
										} px-1 cursor-pointer`}
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

export default Clubs
