import React from "react"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { useActions } from "../hooks/useActions"
import { INavLink } from "../store/types/models"
import { IRootState } from "../store/store"
import { FaBars } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io"
import { TbShield } from "react-icons/tb"

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
		<aside className="h-full bg-slate-300 max-w-[200px] w-full">
			<button className="absolute top-4 right-4 items-center justify-center rounded-md p-2 text-sky-700 hover:bg-sky-700 hover:text-white  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-700 group lg:hidden">
				<FaBars className="h-6 w-6"/>
			</button>
			<div className="w-full">
				<div className="items-center flex flex-row justify-center gap-0.5 my-2 p-1">
					<IoLogoInstagram className="h-6 w-6"/>
					<span className="font-bold text-lg">AikidoLogo</span>
				</div>
				<hr className="h-1 bg-white rounded mx-1 my-2" />
				<div className="h-full p-1 flex flex-col gap-1">
				
						<NavLink to="/private" className={({isActive}) => `p-1 transition-all duration-300 mx-2 rounded-md flex flex-row items-center gap-0.5 hover:bg-slate-500 hover:text-white ${isActive ? "bg-slate-500 text-white" : null}`}>
							<TbShield />
							<span className="font-semibold">Защищенная</span>
						</NavLink>
				</div>
			</div>
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
