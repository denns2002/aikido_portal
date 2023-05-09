import React from "react"
import { useActions } from "../hooks/useActions"
import { IRootState } from "../store/store"
import { connect } from "react-redux"
import { IProfile } from "../store/types/profile"
import { NotificationType } from "../store/types/notifications"
import { v4 } from "uuid"

interface HomeProps {
	profile: IProfile
}

function Home(props: HomeProps) {
	const { addNotification } = useActions()

	return (
		<div className="flex w-full flex-col items-center">
			<h1 className="font-bold text-2xl">Главная страница</h1>
			<div className="flex flex-col gap-2 justify-center h-full">
				<button
					onClick={() => {
						addNotification({id: v4(), type: NotificationType.Success, message: "Cringe"})
					}}
				>
					Add
				</button>
			</div>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
	}
}

export default connect(mapStateToProps)(Home)
