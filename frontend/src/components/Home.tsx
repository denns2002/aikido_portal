import React from "react"
import { useActions } from "../hooks/useActions"
import { IRootState } from "../store/store"
import { connect } from "react-redux"
import { IProfile } from "../store/types/profile"

interface HomeProps {
	profile: IProfile
}

function Home(props: HomeProps) {
	const { updateUserProfile } = useActions()

	console.log(props.profile)

	return (
		<div className="flex w-full justify-center">
			<h1 className="font-bold text-2xl">Главная страница</h1>
			<button
				onClick={() => {
					updateUserProfile(
						{
							first_name: "Cringe",
							mid_name: "Cringe",
							last_name: "Cringe",
							birth_date: props.profile.birth_date,
							city: { id: props.profile.city.id },
						},
						props.profile.slug
					)
				}}
			>
				Test
			</button>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
	}
}

export default connect(mapStateToProps)(Home)
