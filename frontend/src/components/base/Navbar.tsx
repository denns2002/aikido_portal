import { TbLogin } from "react-icons/tb"
import logo from "../../static/logo.svg"
import { NavLink } from "react-router-dom"
import { FaUser, FaBell } from "react-icons/fa"
import { IProfile } from "../../store/types"
import { connect } from "react-redux"
import { IRootState } from "../../store/store"

interface NavbarProps {
	isAuthenticated: boolean
	profile: IProfile
}

function Navbar({isAuthenticated, profile} : NavbarProps) {
	return (
		<div className="sticky top-0 z-50 bg-sky-700 h-20 w-full flex flex-row justify-center items-center text-white">
			<img src={logo} alt="" className="h-16 w-16" />
			<div className="mx-8 w-[20rem] h-full flex flex-row">
				<NavLink to="/events" className={({isActive}) => `h-full flex items-center p-2 border-y-4 border-sky-700 font-medium transform transition-all duration-200 ${isActive ? "bg-white border-white border-b-sky-300 text-sky-700" : "hover:bg-sky-800 hover:border-t-sky-800 hover:border-b-sky-500"}`}>
					Мероприятия
				</NavLink>  
			</div>
            {isAuthenticated ? (
							<div className="flex flex-row justify-center items-center">
                                <FaBell className="h-5 w-5" />
							    <NavLink
    								to="/profile/me"
    								className="flex flex-row justify-center items-center ml-2 hover:underline"
    							>
                                    <div className="flex flex-col text-sm mr-2">
    									<span>{profile.last_name}</span>
    									<span>{profile.first_name}</span>
    								</div>
                                    <FaUser className="h-9 w-9 rounded-full border-4 bg-white border-white text-sky-700" />
    							</NavLink>
							</div>
					) : (
						<div className="bg-sky-900 rounded-md mx-3 my-3 p-1.5 flex flex-row items-center">
							<FaUser className="h-9 w-9 rounded-full border-4 bg-white border-white text-sky-700" />
							<div className="flex flex-col text-sm ms-2">
								<span>Вы не прошли</span>
								<span>авторизацию</span>
							</div>
							<div className="flex-1" />
							<NavLink
								to="/signin"
							>
								<TbLogin className="h-9 w-9" />
							</NavLink>
						</div>
					)}
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
