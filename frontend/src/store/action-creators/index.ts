import * as AuthenticationActionCreators from "../../store/action-creators/authentication"
import * as ProfileActionCreators from "../../store/action-creators/profile"
import * as NotificationsActionCreators from "../../store/action-creators/notifications"
import * as GroupsActionCreators from "../../store/action-creators/groups"

export default {
	...AuthenticationActionCreators,
	...ProfileActionCreators,
	...NotificationsActionCreators,
	...GroupsActionCreators
}
