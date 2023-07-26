import { useState } from "react"
import {
	useDeleteGroupMemberMutation,
	useGetClubsQuery,
	useGetTrainerGroupQuery,
	useGetTrainerGroupsQuery,
} from "../../store/apis"
import { TbPlus, TbShieldFilled } from "react-icons/tb"
import { IRootState } from "../../store/store"
import { connect } from "react-redux"
import { IProfile } from "../../store/types"
import { FaUser } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { RxCross2 } from "react-icons/rx"

interface IGroupProps {
	profile: IProfile
}

function Group({ profile }: IGroupProps) {
	const {
		data: group,
		isLoading: groupIsLoading,
		error,
	} = useGetTrainerGroupQuery({
		slug: "",
		page: 1,
	})

	console.log(error)

	return (
		<div className="flex flex-col items-center h-full w-full">
			<div className="flex flex-row gap-5 h-[8rem] mt-4">
				<div className="rounded-md p-1 w-[15rem] border-2 border-sky-700 relative">
					<div className="flex flex-row items-center p-2">
						<div className="flex flex-col w-[10rem]">
							<div className="flex items-center justify-center">
								<FaUser className="h-16 w-16 rounded-full border-[3px] bg-white border-slate-500 p-1 text-slate-500 m-1" />
							</div>
							<div className="flex-1" />
							<div className="flex items-center justify-center">
								{/* <div
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
									{
										ranks[profile?.rank?.name as RanksKey]
											.text
									}
								</div> */}
							</div>
						</div>
						<div className="m-1 font-semibold text-lg">
							<p>{profile.last_name}</p>
							<p>{profile.first_name}</p>
							<p>{profile.mid_name}</p>
						</div>
					</div>
					<label className="bg-white text-sm absolute left-2 -top-3 px-1">
						Тренер
					</label>
				</div>
				<div className="rounded-md p-1 w-[8rem] border-2 border-sky-700 relative">
					<div className="flex flex-row items-center p-2">
						<div className="flex flex-col w-[8rem]">
							<div className="flex items-center justify-center">
								<TbShieldFilled className="h-16 w-16 rounded-full bg-white p-1 text-slate-500 m-1" />
							</div>
							<div className="flex-1" />
							{/* <div className="flex items-center justify-center font-medium">
								{profile.club ? profile.club : "Не состоите"}
							</div> */}
						</div>
					</div>
					<label className="bg-white text-sm absolute left-2 -top-3 px-1">
						Клуб
					</label>
				</div>
			</div>
			<div className="flex flex-row gap-5 mt-4">
				<div>
					<div className="rounded border-sky-700 border-2 flex flex-col h-[20rem] p-2 gap-1 w-[20rem] scrollbar-hide overflow-auto">
						{group?.results[0]?.groupmember_set?.map(
							(member, index) => (
								<span
									key={index}
									className="border-b-2 border-white pb-0.5 flex flex-row-reverse items-center"
								>
									{/* <span
										className={`font-medium ${
											ranks[member.rank as RanksKey]
												.textColor
										} rounded-md bg-${
											ranks[member.rank as RanksKey]
												.bgColor
										} ${
											ranks[member.rank as RanksKey]
												.bgColor
										} w-20 p-0.5 flex justify-center items-center`}
									>
										{ranks[member.rank as RanksKey].text}
									</span> */}
									<span className="flex-1">
										{member.last_name}{" "}
										{member.first_name[0]}.{" "}
										{member.mid_name[0]}.
									</span>
								</span>
							)
						)}
					</div>
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

export default connect(mapStateToProps, {})(Group)