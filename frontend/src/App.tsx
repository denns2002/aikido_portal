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
import MyProfile from "./components/profile/MyProfile"
import EditMyProfile from "./components/profile/EditMyProfile"
import Group from "./components/group/Group"
import User from "./components/user/UserCr"
import Club from "./components/clubs/Club"
import EditClub from "./components/clubs/EditClub"
import AddClub from "./components/clubs/AddClub"
import NotFound from "./components/base/NotFound"
import UserRegister from "./components/user/UserRegister"
import UpcomingEvents from "./components/events/UpcomingEvents"
import PastEvents from "./components/events/PastEvents"
import EventParticipants from "./components/events/EventParticipants"
import EventApplicaition from "./components/events/EventApplication"

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/clubs"
					element={
						<PrivateRoute
							accessRoles={{
								is_trainer: false,
								is_manager: true,
							}}
						>
							<Clubs />
						</PrivateRoute>
					}
				/>
				<Route
					path="/clubs/:slug"
					element={
						<PrivateRoute
							accessRoles={{
								is_trainer: false,
								is_manager: true,
							}}
						>
							<Club />
						</PrivateRoute>
					}
				/>
				<Route
					path="/clubs/:slug/edit"
					element={
						<PrivateRoute
							accessRoles={{
								is_trainer: false,
								is_manager: true,
							}}
						>
							<EditClub />
						</PrivateRoute>
					}
				/>
				<Route
					path="/clubs/add"
					element={
						<PrivateRoute
							accessRoles={{
								is_trainer: false,
								is_manager: true,
							}}
						>
							<AddClub />
						</PrivateRoute>
					}
				/>
				<Route
					path="/group"
					element={
						<PrivateRoute
							accessRoles={{
								is_trainer: true,
								is_manager: false,
							}}
						>
							<Group />
						</PrivateRoute>
					}
				/>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/events" element={<Events />} />
				<Route
					path="/events/add"
					element={
						<PrivateRoute
							accessRoles={{
								is_trainer: false,
								is_manager: true,
							}}
						>
							<AddEvent />
						</PrivateRoute>
					}
				/>
				<Route path="/events/upcoming" element={<UpcomingEvents />} />
				<Route path="/events/past" element={<PastEvents />} />
				<Route path="/events/:slug" element={<Event />} />
				<Route
					path="/events/:slug/participants"
					element={<EventParticipants />}
				/>
				<Route
					path="/events/:slug/application"
					element={
						<PrivateRoute
							accessRoles={{ is_trainer: true, is_manager: true }}
						>
							<EventApplicaition />
						</PrivateRoute>
					}
				/>
				<Route
					path="/events/:slug/edit"
					element={
						<PrivateRoute accessRoles={{is_trainer: false, is_manager: true}}>
							<EditEvent />
						</PrivateRoute>
					}
				/>
				<Route
					path="/trainer"
					element={
						<PrivateRoute accessRoles={{is_trainer: true, is_manager: false}}>
							<Trainer />
						</PrivateRoute>
					}
				/>
				<Route path="/trainer/add-user" element={<AddUser />} />
				<Route
					path="/profile/my-profile"
					element={
						<PrivateRoute>
							<MyProfile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile/me/edit"
					element={
						<PrivateRoute>
							<EditMyProfile />
						</PrivateRoute>
					}
				/>
				<Route path="/uc" element={<User />} />
				<Route path="/ureg" element={<UserRegister />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	)
}

export default App
