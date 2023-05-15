import React from "react"

function Home() {
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
