import React from "react"
import {
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
	usePatchChangeGroupTrainerMutation,
} from "../store/apis"

function Home() {
	const { data } = useGetTrainerGroupQuery({
		slug: "NoneoEaxvAzTQg",
		page: 1,
	})
	console.log(data)

	const [test, { error }] = usePatchChangeGroupTrainerMutation()
	console.log(error)

	async function handleClick() {
		await test({ groupSlug: "NoneoEaxvAzTQg", trainer: 1 }).unwrap()
	}

	return (
		<div className="flex w-full items-center h-full flex-col">
			<h1 className="font-bold text-2xl">Главная страница</h1>
			<div className="flex justify-center items-center h-full">
				<button
					className="p-1 bg-sky-700 text-white rounded-md h-8"
					onClick={handleClick}
				>
					Test
				</button>
			</div>
		</div>
	)
}

export default Home
