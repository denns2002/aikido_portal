import * as AuthenticationActionCreators from "../../store/action-creators/authentication"
import * as ProfileActionCreators from "../../store/action-creators/profile"
import * as NotificationsActionCreators from "./pushNotifications"

export default {
	...AuthenticationActionCreators,
	...ProfileActionCreators,
	...NotificationsActionCreators,
}
