import React from "react"
import { useActions } from "../hooks/useActions"
import { IRootState } from "../store/store"
import { connect } from "react-redux"
import { IProfile } from "../store/types/profile"

interface HomeProps {
	profile: IProfile
}

function Home(props: HomeProps) {
	const { getGroups } = useActions()

	return (
		<div className="flex w-full flex-col items-center">
			<h1 className="font-bold text-2xl">Главная страница</h1>
			<div className="flex flex-col gap-2 justify-center h-full">
				<button
					onClick={() => {
						getGroups({page: 1})
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
