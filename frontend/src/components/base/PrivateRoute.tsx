import React from "react"
import { connect } from "react-redux/es/exports"
import { Navigate, useLocation } from "react-router-dom"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profiles"
import { IAccessRoles } from "../../store/types"
import { doesHaveAccessRole } from "../../functions"

interface PrivateRouteProps {
	isAuthenticated: boolean
	profileIsLoading: boolean
	accessRoles?: IAccessRoles
	profile: IProfile
	children: React.ReactElement
}

function PrivateRoute({ isAuthenticated, children, accessRoles, profile, profileIsLoading }: PrivateRouteProps) {
	const location = useLocation()

	if (profileIsLoading) {
		return <div className="font-semibold">Идет загрузка...</div>
	}

	return (accessRoles ? isAuthenticated && doesHaveAccessRole(profile, accessRoles) : isAuthenticated) ? (
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
