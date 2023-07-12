import { useState } from "react"
import {
	useGetMyProfileQuery,
	useGetProfileBySlugQuery,
	useGetProfileListQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
	usePatchProfileBySlugMutation,
	usePostRegisterUserMutation,
} from "../../store/apis"
import { IRootState } from "../../store/store"
import { connect } from "react-redux"
import { IProfile, monthes } from "../../store/types"
import { FaUser } from "react-icons/fa"
import { NavLink } from "react-router-dom"

interface ITrainerProps {
	profile: IProfile
}

function User({ profile }: ITrainerProps) {
	const [fuckMyBalls, {data : profileData, error: fuckMyError}] = usePatchProfileBySlugMutation()
	console.log(profileData, fuckMyError)
	

	return (
		<div className="">
			<div className="rounded-md p-1 w-[30rem] border-2 border-sky-700 mt-4 relative">
				<div className="flex flex-row items-center">
					<div className="m-1 font-semibold text-lg">
						<p>{profile.last_name}</p>
						<p>{profile.first_name}</p>
						<p>{profile.mid_name}</p>
					</div>
					<button
						onClick={() => fuckMyBalls({slug: "sansanyanoLc8qX4zyOO", profile: {
							first_name: "Долбоеб",
							last_name: "Дубил",
							user: {
								id: 0,
								password: "",
								last_login: "",
								is_superuser: false,
								username: "fuckMyUesername",
								email: "",
								is_staff: false,
								is_active: false,
								is_verified: false,
								created_at: "",
								updated_at: "",
								groups: [],
								user_permisions: []
							},
							phones: [],
							photos: []
						}}).unwrap()}
					>
						Добавить
					</button>
					<div className="flex-1" />
					<div className="flex flex-col justify-center">
						<div className="m-1 font-semibold text-xl text-white rounded-lg bg-black px-1 h-8 flex justify-center">
							{profile.rank?.name? profile.rank.name : ""}
						</div>
						{/* <div className="text-sm">
							{getCorrectDate(profile?.birth_date ? profile?.birth_date : "")}
						</div> */}
					</div>
					<div className="flex-1" />
					<FaUser className="h-16 w-16 rounded-full border-4 bg-white border-slate-400 p-1 text-slate-400 m-1" />
				</div>
				<label className="bg-white text-sm absolute left-2 -top-3 px-1">
					Тренер
				</label>
			</div>
			<div className="rounded-md p-1 w-[30rem] border-2 border-sky-700 mt-4 relative">
				<NavLink to="/trainer/add-user" className="">
					Добавить пользователя
				</NavLink>
			</div>
		</div>)
	// return <div className="font-semibold text-lg">Ждите в следующем патчеэ</div>
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
	}
}

export default connect(mapStateToProps, {})(User)
