import React from "react"
import { useGetClubsQuery } from "../store/apis"

function Home() {
	const {data} = useGetClubsQuery(1)
	console.log(data);
	

	return (
		<div className="flex w-full items-center h-full flex-col">
			<h1 className="font-bold text-2xl">Главная страница</h1>
			<div className="flex justify-center items-center h-full">
				<button className="p-1 bg-sky-700 text-white rounded-md h-8">
					Test
				</button>
			</div>
		</div>
	)
}

export default Home
