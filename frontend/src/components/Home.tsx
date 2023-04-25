import React from "react"
import { useActions } from "../hooks/useActions"

function Home() {
	const {loadUserProfile} = useActions()

	return (
		<div className="flex w-full justify-center">
			<h1 className="font-bold text-2xl">Главная страница</h1>
			<button onClick={loadUserProfile}>Test</button>
		</div>
	)
}

export default Home
