import { useState } from "react"
import { useGetClubsQuery, useGetEventsQuery } from "../../store/apis"
import ClubCard from "./ClubCard"

function Clubs() {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useGetClubsQuery(page)

	console.log(data)

	return isLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="w-full h-full">
			{/* <div className="font-semibold text-lg">Ждите</div> */}
			
			<div className="flex gap-4 m-3 flex-wrap items-center">
				{data?.results.map((club, index) => {
					return (
						<ClubCard
							key={index}
							club={club}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Clubs
