import React from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import Home from "./components/base/Home"
import PrivateRoute from "./components/base/PrivateRoute"
import SignIn from "./components/base/SignIn"
import AddUser from "./components/trainer/AddUser"
import Layout from "./hocs/Layout"
import Events from "./components/events/Events"
import Event from "./components/events/Event"
import AddEvent from "./components/events/AddEvent"
import Clubs from "./components/clubs/Clubs"
import Trainer from "./components/trainer/Trainer"
import EditEvent from "./components/events/EditEvent"
import ProfileMe from "./components/profile/ProfileMe"
import EditProfileMe from "./components/profile/EditProfileMe"
import Group from "./components/group/Group"
import User from "./components/user/UserCr"
import Club from "./components/clubs/Club"
import EditClub from "./components/clubs/EditClub"
import AddClub from "./components/clubs/AddClub"
import NotFound from "./components/base/NotFound"
import UserRegister from "./components/user/UserRegister"

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
					path="/clubs/:slug"
					element= {
						<PrivateRoute accessRoles={["Тренер", "Руководитель"]}>
							<Club />
						</PrivateRoute>
					}	
				/>
				<Route
					path="/clubs/:slug/edit"
					element={
						<PrivateRoute accessRoles={["Тренер", "Руководитель"]}>
							<EditClub />
						</PrivateRoute>
					}
				/>
				<Route
					path="/clubs/add"
					element={
						<PrivateRoute accessRoles={["Тренер", "Руководитель"]}>
							<AddClub />
						</PrivateRoute>
					}
				/>
				<Route
					path="/group"
					element={
						<PrivateRoute accessRoles={["Студент", "Тренер", "Руководитель"]}>
							<Group />
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
					path="/trainer/add-user"
					element={
						<AddUser />
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
				<Route
					path="/uc"
					element={<User />}
				/>
				<Route
					path="/ureg"
					element={<UserRegister />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
		</Layout>
	)
}

export default App
