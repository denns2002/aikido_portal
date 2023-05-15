import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import Notification from "./PushNotification"
import { IPushNotification } from "../../store/types/pushNotifications"

interface PushNotificationsProvideProps {
	notifications: IPushNotification[]
	children: React.ReactNode
}

function PushNotificationsProvider(props: PushNotificationsProvideProps) {
	return (
		<>
			<div className="fixed top-3 right-3 w-52 flex flex-col gap-1">
				{props.notifications.map((notification, index) => {
					return (
						<Notification
							key={index}
							information={notification}
						/>
					)
				})}
			</div>
			{props.children}
		</>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		notifications: state.pushNotifications.notifications
	}
}

export default connect(mapStateToProps)(PushNotificationsProvider)
