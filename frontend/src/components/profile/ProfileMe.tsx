import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profile"
import { FaUser } from "react-icons/fa"
import { useGetClubBySlugQuery, useGetGroupBySlugQuery } from "../../store/apis"
import { monthes } from "../../store/types/events"
import { NavLink } from "react-router-dom"

interface ProfileProps {
	profile: IProfile
}

function ProfileMe({ profile }: ProfileProps) {
	const { data: club } = useGetClubBySlugQuery(profile?.club)
	const { data: group } = useGetGroupBySlugQuery(profile?.group)

	function getCorrectDate(date: string) {
		const arr = date.split("-")

		const time = arr[2].split("T").length > 1 ? arr[2].split("T")[1] : ""

		type ObjectKey = keyof typeof monthes

		return (
			[
				time
					? arr[2][0] === "0"
						? arr[2][1]
						: arr[2].slice(0, 1)
					: arr[2][0] === "0"
					? arr[2][1]
					: arr[2],
				monthes[arr[1] as ObjectKey],
				arr[0],
			].join(" ") + (time ? `, ${time.slice(0, 5)}` : "")
		)
	}

	return (
		<div className="">
			<div className="m-4 p-1 rounded-md w-[30rem] border-2 border-sky-700">
				<div className="flex flex-row-reverse items-center">
					<FaUser className="h-16 w-16 rounded-full border-4 bg-white border-slate-400 p-1 text-slate-400 m-1" />
					<div className="flex-1" />
					<div className="m-1 font-semibold text-lg">
						<p>{profile.last_name}</p>
						<p>{profile.first_name}</p>
						<p>{profile.mid_name}</p>
					</div>
				</div>
				<hr className="bg-white mx-1 my-1" />
				<div className="m-1">
					<span className="font-medium">Дата рождения:</span>{" "}
					{profile.birth_date ? (
						getCorrectDate(profile.birth_date)
					) : (
						<span className="text-red-700">еще не установлена</span>
					)}
				</div>
				<hr className="bg-white mx-1 my-1" />
				<div className="m-1">
					<span className="font-medium">Клуб:</span>{" "}
					{club ? (
						club.name
					) : (
						<span className="text-red-700">не состоит</span>
					)}
				</div>
				<div className="m-1">
					<span className="font-medium">Группа:</span>{" "}
					{group ? (
						group.name
					) : (
						<span className="text-red-700">не состоит</span>
					)}
				</div>
				<div className="flex justify-center m-1">
					<NavLink
						to="/profile/me/edit"
						className="transition-all duration-200 font-semibold rounded-md p-1 h-9 mt-2 hover:bg-sky-300 bg-sky-500 text-white"
					>
						Редактировать профиль
					</NavLink>
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		profile: state.profile.profile,
	}
}

export default connect(mapStateToProps, {})(ProfileMe)
