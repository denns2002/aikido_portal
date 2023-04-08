import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { INavLink } from "../store/types/models"
import { IRootState } from "../store/store"

import home from "../svg/home.svg"

interface NavbarProps {
	isAuthenticated: boolean
	username: string
}

function Navbar(props: NavbarProps) {
	const { logout } = useActions()

	const navLinks: INavLink[] = [
		{
			title: "Защищенная",
			path: "/private",
		},
	]

	return (
		<aside className="bg-sky-200 h-full w-36 flex flex-col">
			<NavLink
				to="/"
				className="font-semibold hover:shadow-lg hover:bg-sky-300 mt-2 p-1 pl-3"
			>
				Главная
			</NavLink>
			{props.isAuthenticated ? (
				<>
					<hr className="h-1 bg-white rounded mx-1 my-2" />
					<nav className="flex flex-col gap-1">
						{navLinks.map((nav, index) => {
							return (
								<NavLink
									key={index}
									to={nav.path}
									className="font-semibold hover:shadow-lg hover:bg-sky-300 p-1 pl-3"
								>
									{nav.title}
								</NavLink>
							)
						})}
					</nav>
				</>
			) : null}
			<div className="flex-1" />
			{props.isAuthenticated ? (
				<div
					className="font-semibold hover:shadow-lg hover:bg-sky-300 mt-2 p-1 pl-3 mb-2 cursor-pointer"
					onClick={logout}
				>
					{props.username}
				</div>
			) : (
				<NavLink
					to="/signin"
					className="font-semibold hover:shadow-lg hover:bg-sky-300 mt-2 p-1 pl-3 mb-2"
				>
					Войти
				</NavLink>
			)}
		</aside>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		username: state.authentication.user.username,
	}
}

export default connect(mapStateToProps)(Navbar)
