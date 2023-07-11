import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile, ranks, RanksKey } from "../../store/types/profile"
import { FaUser } from "react-icons/fa"
import {
	useGetClubBySlugQuery,
	useGetGroupBySlugQuery,
	useGetMyProfileQuery,
} from "../../store/apis"
import { monthes } from "../../store/types/events"
import { NavLink, useLocation } from "react-router-dom"

interface ProfileProps {
	isAuthenticated: boolean
}

function ProfileMe({isAuthenticated} : ProfileProps) {
	const location = useLocation()

	const {
		data: profile,
		error,
		isLoading: profileIsLoading,
	} = useGetMyProfileQuery()
	const { data: club, isLoading: clubIsLoading } = useGetClubBySlugQuery(
		profile?.club ? profile?.club : ""
	)
	const { data: group, isLoading: groupIsLoading } = useGetGroupBySlugQuery(
		profile?.group ? profile?.group : ""
	)

	console.log(error)

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
			{!profileIsLoading ? (
				<div className="m-4 rounded-lg w-[34rem] border-2 border-sky-700 flex flex-row">
					<div className="flex flex-col w-[12rem] p-2 border-r-2 border-r-sky-700">
						<div className="flex items-center justify-center">
							<FaUser className="h-24 w-24 rounded-full border-[3px] bg-white border-slate-500 p-1 text-slate-500 m-1" />
						</div>
						<div className="m-1 font-semibold text-lg">
							<p>{profile?.last_name}</p>
							<p>{profile?.first_name}</p>
							<p>{profile?.mid_name}</p>
						</div>
						<div className="flex items-center justify-center">
							<div
								className={`font-medium ${
									ranks[profile?.rank?.name as RanksKey]
										.textColor
								} rounded-md bg-${
									ranks[profile?.rank?.name as RanksKey]
										.bgColor
								} ${
									ranks[profile?.rank?.name as RanksKey]
										.bgColor
								} w-20 p-0.5 flex justify-center items-center`}
							>
								{ranks[profile?.rank?.name as RanksKey].text}
							</div>
						</div>
					</div>
					<div className="flex flex-col w-[22rem] p-2">
						<div className="m-1">
							<span className="font-medium">Почта:</span>{" "}
							{profile?.user?.email ? (
								profile?.user?.email
							) : (
								<span className="text-red-700">
									еще не установлена
								</span>
							)}
						</div>
						<hr className="mx-1 my-1" />
						<div className="m-1">
							<span className="font-medium">Дата рождения:</span>{" "}
							{profile?.birth_date ? (
								getCorrectDate(profile.birth_date)
							) : (
								<span className="text-red-700">
									еще не установлена
								</span>
							)}
						</div>
						<hr className="mx-1 my-1" />
						<div className="m-1">
							<span className="font-medium">Клуб:</span>{" "}
							{club ? (
								club.name
							) : (
								<span className="text-red-700">
									нигде не состоите
								</span>
							)}
						</div>
						<div className="m-1">
							<span className="font-medium">Группа:</span>{" "}
							{group ? (
								group.name
							) : (
								<span className="text-red-700">
									нигде не состоите
								</span>
							)}
						</div>
						<div className="flex-1" />
						<div className="flex justify-center m-1">
							<NavLink
								to="/profile/me/edit"
								className="transition-all duration-200 font-semibold rounded-md p-1 h-8 mt-2 hover:bg-slate-300 bg-slate-500 text-white"
							>
								Редактировать профиль
							</NavLink>
						</div>
					</div>
				</div>
			) : (
				<div className="font-semibold text-lg">Идет загрузка</div>
			)}
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated
	}
}

export default connect(mapStateToProps, {})(ProfileMe)
