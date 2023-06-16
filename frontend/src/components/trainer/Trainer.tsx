import { useState } from "react"
import {
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"
import { IRootState } from "../../store/store"
import { connect } from "react-redux"
import { IProfile, monthes } from "../../store/types"
import { FaUser } from "react-icons/fa"
import { NavLink } from "react-router-dom"

interface ITrainerProps {
	profile: IProfile
}

function Trainer({ profile }: ITrainerProps) {
	// const { data: groupsInfo } = useGetTrainerGroupsQuery(1)

	// const [activeGroup, setActiveGroup] = useState(groupsInfo?.results[0]?.slug)

	// const { data: group, isLoading: groupIsLoading, error } = useGetTrainerGroupQuery({
	// 	slug: activeGroup ? activeGroup : "",
	// 	page: 1,
	// })

	// function getCorrectDate(date: string) {
	// 	const arr = date.split("-")

	// 	const time = arr[2].split("T").length > 1 ? arr[2].split("T")[1] : ""

	// 	type ObjectKey = keyof typeof monthes

	// 	return (
	// 		[
	// 			time
	// 				? arr[2][0] === "0"
	// 					? arr[2][1]
	// 					: arr[2].slice(0, 1)
	// 				: arr[2][0] === "0"
	// 				? arr[2][1]
	// 				: arr[2],
	// 			monthes[arr[1] as ObjectKey],
	// 			arr[0],
	// 		].join(" ") + (time ? `, ${time.slice(0, 5)}` : "")
	// 	)
	// }

	// console.log(error);

	// return (
	// 	<div className="">
	// 		<div className="rounded-md p-1 w-[30rem] border-2 border-sky-700 mt-4 relative">
	// 			<div className="flex flex-row items-center">
	// 				<div className="m-1 font-semibold text-lg">
	// 					<p>{profile.last_name}</p>
	// 					<p>{profile.first_name}</p>
	// 					<p>{profile.mid_name}</p>
	// 				</div>
	// 				<div className="flex-1" />
	// 				<div className="flex flex-col justify-center">
	// 					<div className="m-1 font-semibold text-xl text-white rounded-lg bg-black px-1 h-8 flex justify-center">
	// 						{profile.rank.name}
	// 					</div>
	// 					<div className="text-sm">
	// 						{getCorrectDate(profile?.birth_date ? profile?.birth_date : "")}
	// 					</div>
	// 				</div>
	// 				<div className="flex-1" />
	// 				<FaUser className="h-16 w-16 rounded-full border-4 bg-white border-slate-400 p-1 text-slate-400 m-1" />
	// 			</div>
	// 			<label className="bg-white text-sm absolute left-2 -top-3 px-1">
	// 				Тренер
	// 			</label>
	// 		</div>
	// 		<div className="rounded-md p-1 w-[30rem] border-2 border-sky-700 mt-4 relative">
	// 			<NavLink to="/trainer/add-user" className="">
	// 				Добавить пользователя
	// 			</NavLink>
	// 		</div>
	// 	</div>)
	return <div className="font-semibold text-lg">Ждите в следующем патче</div>
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
	}
}

export default connect(mapStateToProps, {})(Trainer)
