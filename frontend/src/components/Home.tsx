import React from "react"
import {
	useGetTrainerGroupQuery,
	usePostAddUserMutation,
} from "../store/apis"

function Home() {
	const { data, error } = useGetTrainerGroupQuery({slug: "adminadminRMZfW2R3YX", page: 1})
	console.log(data, error)

	const [test, { data: testData, error: testError }] = usePostAddUserMutation()
	console.log(testData, testError)

	async function handleClick() {
		await test({username: "cringe", password: "cringevald123", password2: "cringevald123", email: "8aniwoov8@gmail.com"}).unwrap()
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
