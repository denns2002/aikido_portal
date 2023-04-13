import React from "react"
import { connect } from "react-redux/es/exports"
import { Navigate, useLocation } from "react-router-dom"
import { IRootState } from "../store/store"

interface PrivateRouteProps {
	isAuthenticated: boolean
	accessRoles: string[]
	userRole: string
	children: React.ReactElement
}

function PrivateRoute(props: PrivateRouteProps) {
	const location = useLocation()

	const { isAuthenticated, children } = props

	return isAuthenticated && props.accessRoles.includes(props.userRole) ? (
		children
	) : (
		<Navigate
			to="/"
			replace
			state={{ from: location }}
		/>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
		userRole: state.authentication.user.role
	}
}

export default connect(mapStateToProps)(PrivateRoute)
