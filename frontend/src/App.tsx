import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./components/base/Home"
import PrivateRoute from "./components/base/PrivateRoute"
import SignIn from "./components/base/SignIn"
import SignUp from "./components/base/SignUp"
import Layout from "./hocs/Layout"
import Events from "./components/events/Events"
import Event from "./components/events/Event"
import AddEvent from "./components/events/AddEvent"
import Clubs from "./components/clubs/Clubs"
import Club from "./components/clubs/Club"
import Trainer from "./components/trainer/Trainer"
import EditEvent from "./components/events/EditEvent"

function App() {
	return (
		<Layout>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/signup"
					element={<SignUp />}
				/>
				<Route
					path="/signin"
					element={<SignIn />}
				/>
				<Route
					path="/events"
					element={<Events />}
				/>
				<Route
					path="/events/:slug"
					element={<Event />}
				/>
				<Route
					path="/events/add"
					element={
							<AddEvent />
					}
				/>
				<Route
					path="/events/:slug/edit"
					element={
							<EditEvent />
					}
				/>
				<Route
					path="/clubs"
					element={
						<PrivateRoute accessRoles={["Тренер"]}>
							<Clubs />
						</PrivateRoute>
					}
				/>
				<Route
					path="/trainer"
					element={
						<PrivateRoute accessRoles={["Тренер"]}>
							<Trainer />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Layout>
	)
}

export default App
