import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import ActionCreators from "../store/action-creators/index"

export function useActions() {
	const dispatch = useDispatch()

	return bindActionCreators(ActionCreators, dispatch)
}
