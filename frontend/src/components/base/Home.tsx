import React from "react"
import {

} from "../../store/apis"
import { Navigate } from "react-router-dom"

function Home() {
	return (
		<Navigate to="/events" />
	)
}

export default Home
