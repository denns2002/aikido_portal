import { useState } from "react"
import { useGetClubsQuery, useGetEventsQuery } from "../../store/apis"
import ClubCard from "./ClubCard"
import { NavLink } from "react-router-dom"
import { CiCirclePlus } from "react-icons/ci"

function Clubs() {
	const [page, setPage] = useState(1)
	const { data, isLoading } = useGetClubsQuery(page)

	console.log(data)

	return isLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="w-full h-full">			
			<div className="flex gap-y-4 gap-x-[9vw] m-3 flex-wrap items-center">
				{data?.results.map((club, index) => {
					return (
						<ClubCard
							key={index}
							club={club}
						/>
					)
				})}
				<NavLink to={"/clubs/add"} 
				className="border-sky-700 text-sky-700 hover:border-sky-500 hover:text-sky-500 transition-all duration-200">
					<div className="rounded-md border-2 border-sky-700 p-1 w-80">
						<div className="p-1 h-full w-full flex justify-center items-center">
							<CiCirclePlus className="h-24 w-24" />
						</div>
					</div>
				</NavLink>
			</div>
		</div>
	)
}

export default Clubs
