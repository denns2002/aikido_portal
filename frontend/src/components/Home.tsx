import React from "react"
import {
	useGetTrainerGroupQuery,
	usePatchEventBySlugMutation,
	usePostAddUserMutation,
} from "../store/apis"

function Home() {
	const { data, error } = useGetTrainerGroupQuery({slug: "adminadminRMZfW2R3YX", page: 1})
	console.log(data, error)

	const [test, { data: testData, error: testError }] = usePatchEventBySlugMutation()
	console.log(testData, testError)

	async function handleClick() {
		await test({slug: "testeventXUfTORRdeT", event: {name: "TestEventChange", reg_start: "2023-05-10", reg_end: "2023-05-11", date_start: "2023-05-12", date_end: "2023-05-13", about: "TestEventChange" }}).unwrap()
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
