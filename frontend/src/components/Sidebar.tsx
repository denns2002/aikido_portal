import { FaBars, FaUser } from "react-icons/fa"
import { TbShield, TbLayoutGrid, TbLogout, TbLogin } from "react-icons/tb"
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { IRootState } from "../store/store"
import { connect } from "react-redux"
import { INavLink, IUser } from "../store/types/models"
import { useActions } from "../hooks/useActions"

interface SidebarProps {
	isAuthenticated: boolean
	user: IUser
}

function Sidebar(props: SidebarProps) {
	const [isMobile, setIsMobile] = useState(true)
	const [hidden, setHidden] = useState(true)

	const handleResize = () => {
		if (window.innerWidth < 1024) {
			setIsMobile(true)
			setHidden(true)
		} else {
			setIsMobile(false)
			setHidden(false)
		}
	}

	useEffect(() => {
		window.addEventListener("resize", handleResize)
	})

	const { logout } = useActions()

	const navLinks: INavLink[] = [
		{
			to: "/private",
			label: "Защищенная",
			roles: ["SPORTSMAN"],
			icon: <TbShield className="h-5 w-5" />,
		},
	]

	return (
		<>
			<aside
				className={`fixed top-0 -left-64 h-full w-64 z-20 lg:static lg:w-72 bg-sky-700 block text-white justify-between transform duration-500 lg:duration-0 ${
					isMobile && !hidden ? "translate-x-64" : null
				}`}
			>
				<div className="h-full w-full flex flex-col">
					<div className="items-center flex flex-row justify-center gap-0.5 my-2 p-1">
						<span className="font-bold text-2xl">Logo</span>
					</div>
					<hr className="h-1 bg-white rounded mx-2 my-2" />
					<nav className="h-full p-1 flex flex-col gap-1">
						<NavLink
							to="/"
							className={({ isActive }) =>
								`p-1 transition-all duration-200 mx-2 rounded-md flex flex-row items-center gap-0.5 hover:bg-white hover:text-sky-700 ${
									isActive ? "bg-white text-sky-700" : null
								}`
							}
							onClick={() => setHidden(true)}
						>
							<TbLayoutGrid className="h-5 w-5" />
							<span className="font-semibold text-lg">
								Главная
							</span>
						</NavLink>
						{props.isAuthenticated
							? navLinks.map(
									({ roles, icon, label, to }, index) => {
										if (!roles.includes("SPORTSMAN")) {
											return null
										}

										return (
											<NavLink
												to={to}
												className={({ isActive }) =>
													`p-1 transition-all duration-200 mx-2 rounded-md flex flex-row items-center gap-0.5 hover:bg-white hover:text-sky-700 ${
														isActive
															? "bg-white text-sky-700"
															: null
													}`
												}
												onClick={() => setHidden(true)}
											>
												{icon}
												<span className="font-semibold text-lg">
													{label}
												</span>
											</NavLink>
										)
									}
							  )
							: null}
					</nav>
					<div className="flex-1" />
					{props.isAuthenticated ? (
						<div className="bg-sky-900 rounded-md mx-3 my-3 p-1.5 flex flex-row">
							<NavLink
								to="#"
								className="flex flex-row justify-center items-center"
							>
								<FaUser className="h-9 w-9 rounded-full border-4 bg-white border-white text-sky-700" />
								<div className="flex flex-col text-sm ms-2">
									<span>{props.user.secondName}</span>
									<span>{props.user.firstName}</span>
								</div>
							</NavLink>
							<div className="flex-1" />
							<button
								type="button"
								onClick={() => {
									logout()
									setHidden(true)
								}}
							>
								<TbLogout className="h-9 w-9" />
							</button>
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
								onClick={() => setHidden(true)}
							>
								<TbLogin className="h-9 w-9" />
							</NavLink>
						</div>
					)}
				</div>
			</aside>
			<button
				className={`fixed top-3 right-3 items-center justify-center rounded-md p-2 ${
					hidden
						? "bg-transparent text-sky-700"
						: "bg-sky-700 text-white"
				} transition-all duration-200 hover:bg-sky-700 hover:text-white block lg:hidden z-20`}
				onClick={() => setHidden((prev) => !prev)}
			>
				<FaBars className="h-6 w-6" />
			</button>
			<div
				className={`w-screen h-screen fixed top-0 left-0 bg-sky-700 ${
					(isMobile && hidden) || !isMobile ? "hidden" : null
				} opacity-20 z-10`}
				onClick={() => setHidden((prev) => !prev)}
			/>
		</>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		user: state.authentication.user,
	}
}

export default connect(mapStateToProps)(Sidebar)
