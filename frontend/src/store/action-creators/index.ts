import * as AuthenticationActionCreators from "../../store/action-creators/authentication"
import * as ProfileActionCreators from "../../store/action-creators/profile"
import * as NotificationsActionCreators from "../../store/action-creators/notifications"

export default {
	...AuthenticationActionCreators,
	...ProfileActionCreators,
	...NotificationsActionCreators
}
