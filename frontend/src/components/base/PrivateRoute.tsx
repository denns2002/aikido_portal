import React from "react"
import { connect } from "react-redux/es/exports"
import { Navigate, useLocation } from "react-router-dom"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profile"

interface PrivateRouteProps {
	isAuthenticated: boolean
	profileIsLoading: boolean
	accessRoles: string[]
	profile: IProfile
	children: React.ReactElement
}

function PrivateRoute({ isAuthenticated, children, accessRoles, profile, profileIsLoading }: PrivateRouteProps) {
	const location = useLocation()

	function haveAccessRole(accessRoles: string[]) {
		for (let index = 0; index < profile.roles.length; index++) {
			if (accessRoles.includes(profile.roles[index].name)) {
				return true
			}
		}

		return false
	}

	console.log("private", isAuthenticated, accessRoles, haveAccessRole(accessRoles), profile);

	if (profileIsLoading) {
		return <div className="font-semibold">Идет загрузка...</div>
	}

	return isAuthenticated && haveAccessRole(accessRoles) ? (
		children
	) : (
		<Navigate
			to="/signin"
			replace
			state={{from: location.pathname}}
		/>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profile: state.profile.profile,
		profileIsLoading: state.profile.isLoading
	}
}

export default connect(mapStateToProps)(PrivateRoute)
