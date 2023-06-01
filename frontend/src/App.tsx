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
import Trainer from "./components/trainer/Trainer"
import EditEvent from "./components/events/EditEvent"
import ProfileMe from "./components/profile/ProfileMe"
import EditProfileMe from "./components/profile/EditProfileMe"
import Groups from "./components/groups/Groups"

function App() {
	return (
		<Layout>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/clubs"
					element={
						<PrivateRoute accessRoles={["Тренер", "Руководитель"]}>
							<Clubs />
						</PrivateRoute>
					}
				/>
				<Route
					path="/groups"
					element={
						<PrivateRoute accessRoles={["Студент", "Тренер", "Руководитель"]}>
							<Groups />
						</PrivateRoute>
					}
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
						<PrivateRoute accessRoles={["Тренер", "Руководитель"]}>
							<AddEvent />
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
				<Route
					path="/events/:slug/edit"
					element={
						<PrivateRoute accessRoles={["Тренер", "Руководитель"]}>
							<EditEvent />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile/me"
					element={
						<PrivateRoute accessRoles={["Тренер", "Студент"]}>
							<ProfileMe />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile/me/edit"
					element={
						<PrivateRoute accessRoles={["Тренер", "Студент"]}>
							<EditProfileMe />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Layout>
	)
}

export default App
