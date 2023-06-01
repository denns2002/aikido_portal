import { useState, useEffect } from "react"
import { IPushNotification, PushNotificationType } from "../../store/types/pushNotifications"
import { useActions } from "../../hooks/useActions"

interface NotificationProps {
	information: IPushNotification
}

function PushNotification(props: NotificationProps) {
	const [mounted, setMounted] = useState(false)

	const { removePushNotification } = useActions()

	useEffect(() => {
		setMounted(true)

		setTimeout(() => {
			setMounted((prev) => !prev)
		}, 2000)

		setTimeout(() => {
			removePushNotification(props.information.id)
		}, 2700)
	}, [])

	return (
		<div
			className={`p-1 shadow-md border-2 rounded-md overflow-hidden transform-all transition-opacity duration-700 bg-white ${
				mounted ? "opacity-100" : "opacity-0"
			} ${
				props?.information?.type === PushNotificationType.Success
					? "border-green-400"
					: "border-red-500"
			}`}
		>
			<p className="m-1 text-md">{props.information.message}</p>
		</div>
	)
}

export default PushNotification
