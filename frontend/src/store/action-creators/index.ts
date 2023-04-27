import * as AuthenticationActionCreators from "../../store/action-creators/authentication"
import * as ProfileActionCreators from "../../store/action-creators/profile"

export default {
	...AuthenticationActionCreators,
	...ProfileActionCreators
}
