import { TbLogin } from "react-icons/tb"
import logo from "../../static/logo.svg"
import { NavLink, useLocation } from "react-router-dom"
import { FaUser, FaBell } from "react-icons/fa"
import { IProfile } from "../../store/types"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { onFocus } from "@reduxjs/toolkit/dist/query/core/setupListeners"

interface NavbarProps {
	isAuthenticated: boolean
	profile: IProfile
}

function Navbar({ isAuthenticated, profile }: NavbarProps) {
	const location = useLocation()	
	
	return (
		<div className="bg-sky-700 h-20 w-full flex flex-row justify-center items-center text-white">
			<img src={logo} alt="" className="h-16 w-16" />
			<div className="mx-8 w-[50rem] h-full flex flex-row">
				<div className="dropdown z-10">
					<div className="dropdown-content flex-col text-base bg-sky-600 font-medium gap-1 rounded-b-md border-x-2 border-b-2 border-sky-700 p-1">
						<NavLink to="/events" className="hover:text-lg transform transition-all duration-200">
							Главная
						</NavLink>
						<NavLink to="/events/upcoming" className="hover:text-lg transform transition-all duration-200">
							Предстоящие
						</NavLink>
						<NavLink to="/events/past" className="hover:text-lg transform transition-all duration-200">
							Прошедшие
						</NavLink>
					</div>
					<div
						className={
							`dropdown-element h-full hover:text-xl flex text-lg items-center p-2 border-y-4 cursor-pointer border-sky-700 font-medium transform transition-all duration-200 ${
								location.pathname.split("/")[1] === "events" ? "underline" : null
							}`
						}
					>
						Мероприятия
					</div>
				</div>
				<div className="flex-1" />
				{isAuthenticated ? (
					<div className="flex flex-row justify-center items-center">
						<NavLink
							to="/profile/me"
							className={({ isActive }) =>
								`h-full flex flex-row transform transition-all duration-200 justify-center items-center font-medium text-lg hover:text-xl ${
									isActive ? "underline" : null
								}`
							}
						>
							<span className="mr-2">
								{profile.last_name} {profile.first_name}
							</span>
							<FaUser className="h-10 w-10 rounded-full border-4 bg-white border-white text-sky-700 mr-2" />
							<FaBell className="h-5 w-5" />
						</NavLink>
					</div>
				) : (
					<div className="flex flex-row justify-center items-center">
						<NavLink
							to="/signin"
							className={({ isActive }) =>
								`h-full flex flex-row transform transition-all duration-200 justify-center items-center font-medium text-lg hover:text-xl ${
									isActive ? "underline" : null
								}`
							}
						>
							<span className="mr-2">
								Авторизоваться
							</span>
							<FaUser className="h-10 w-10 rounded-full border-4 bg-white border-white text-sky-700 mr-2" />
						</NavLink>
					</div>
				)}
			</div>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profile: state.profile.profile,
	}
}

export default connect(mapStateToProps)(Navbar)
