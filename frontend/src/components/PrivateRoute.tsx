import React from "react"
import { connect } from "react-redux/es/exports"
import { Navigate, useLocation } from "react-router-dom"
import { IRootState } from "../store/store"

interface PrivateRouteProps {
	isAuthenticated: boolean
	children: React.ReactElement
}

function PrivateRoute(props: PrivateRouteProps) {
	const location = useLocation()

	const { isAuthenticated, children } = props

	return isAuthenticated ? (
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
	}
}

export default connect(mapStateToProps)(PrivateRoute)
