import React from "react"
import { connect } from "react-redux/es/exports"
import { Navigate, useLocation } from "react-router-dom"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profile"

interface PrivateRouteProps {
	isAuthenticated: boolean
	accessRoles: string[]
	profile: IProfile
	children: React.ReactElement
}

function PrivateRoute({ isAuthenticated, children, accessRoles, profile }: PrivateRouteProps) {
	const location = useLocation()

	function haveAccessRole(accessRoles: string[]) {
		for (let index = 0; index < profile.roles.length; index++) {
			if (accessRoles.includes(profile.roles[index].name)) {
				return true
			}
		}

		return false
	}

	return isAuthenticated && haveAccessRole(accessRoles) ? (
		children
	) : (
		<Navigate
			to="/signin"
			replace
			state={{ from: location }}
		/>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		profile: state.profile.profile
	}
}

export default connect(mapStateToProps)(PrivateRoute)
