import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import Notification from "./Notification"
import { INotification } from "../../store/types/notifications"

interface NotificationProvideProps {
	notifications: INotification[]
	children: React.ReactNode
}

function NotificationProvider(props: NotificationProvideProps) {
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
		notifications: state.notifications.notifications
	}
}

export default connect(mapStateToProps)(NotificationProvider)
