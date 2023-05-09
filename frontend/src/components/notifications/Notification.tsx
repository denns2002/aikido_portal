import { useState, useEffect } from "react"
import { INotification, NotificationType } from "../../store/types/notifications"
import { useActions } from "../../hooks/useActions"

interface NotificationProps {
	information: INotification
}

function Notification(props: NotificationProps) {
	const [mounted, setMounted] = useState(false)

	const { removeNotification } = useActions()

	useEffect(() => {
		setMounted(true)

		setTimeout(() => {
			setMounted((prev) => !prev)
		}, 2000)

		setTimeout(() => {
			removeNotification(props.information.id)
		}, 2700)
	}, [])

	return (
		<div
			className={`p-1 shadow-md border-2 rounded-md overflow-hidden transform-all transition-opacity duration-700 ${
				mounted ? "opacity-100" : "opacity-0"
			} ${
				props?.information?.type === NotificationType.Success
					? "border-green-400"
					: "border-red-500"
			}`}
		>
			<p className="m-1 text-md">{props.information.message}</p>
		</div>
	)
}

export default Notification
