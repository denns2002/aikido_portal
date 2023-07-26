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

interface ITrainerProps {
	profile: IProfile
}

function Trainer({ profile }: ITrainerProps) {
	const { data: groupsInfo } = useGetTrainerGroupsQuery(1)

	const [deleteMember, {}] = useDeleteGroupMemberMutation()

	const [activeGroup, setActiveGroup] = useState(groupsInfo?.results[0]?.slug)

	const {
		data: group,
		isLoading: groupIsLoading,
		error,
	} = useGetTrainerGroupQuery({
		slug: activeGroup ? activeGroup : "",
		page: 1,
	})

	const [modal, setModal] = useState(false)
	const [confirmDelete, setConfirmDelete] = useState(false)
	const [memberToDelete, setMemberToDelete] = useState("")

	console.log(error)

	return (
		<div className="flex flex-col items-center relative h-full w-full">
			<div className="flex flex-row gap-5 h-[8rem] mt-4">
				<div className="rounded-md p-1 w-[15rem] border-2 border-sky-700 relative">
					<div className="flex flex-row items-center p-2">
						<div className="flex flex-col w-[10rem]">
							<div className="flex items-center justify-center">
								<FaUser className="h-16 w-16 rounded-full border-[3px] bg-white border-slate-500 p-1 text-slate-500 m-1" />
							</div>
							<div className="flex-1" />
							{profile?.rank ? <div className="flex items-center justify-center">
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
							</div> : <div>Ранг отсутствует</div>}
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
				<div className="rounded border-sky-700 border-2 flex flex-col h-[10rem] p-2 gap-1 w-[10rem]">
					{groupsInfo?.results.map((group, index) => (
						<div key={index} className="flex flex-row">
							<span
								key={index}
								className={`font-medium rounded p-0.5 transition-all duration-200 ${
									group.slug === activeGroup
										? "bg-sky-700 text-white"
										: "hover:bg-sky-300"
								} cursor-pointer`}
								onClick={() => setActiveGroup(group.slug)}
							>
								{group.name}
							</span>
							<div className="flex-1" />
						</div>
					))}
				</div>
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
					<div className="flex justify-center w-full mt-2">
						<button
							className="bg-slate-500 rounded-md text-white p-1"
							onClick={() => setModal(true)}
						>
							Редактировать группу
						</button>
					</div>
				</div>
			</div>
			<div
				className={`${
					confirmDelete ? null : "hidden"
				} transition-all duration-200 z-10 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center text-white`}
			>
				<div
					className={`z-11 bg-slate-500 relative flex flex-col items-center rounded-xl px-8 py-7 transition-all duration-200 ${
						confirmDelete ? "opacity-100" : "opacity-0"
					} w-[20rem]`}
				>
					<span className="font-medium text-lg">
						Исключить участника?
					</span>
					<div className="peer-pla flex justify-center flex-row gap-4">
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 bg-red-500 hover:bg-red-300 text-white"
							type="submit"
							onClick={async () => {
								await deleteMember(memberToDelete).unwrap()

								setConfirmDelete(false)
							}}
						>
							Да
						</button>
						<button
							className="transition-all duration-200 font-semibold rounded-md p-1 w-28 h-9 mt-2 bg-white hover:bg-slate-300 text-black"
							type="button"
							onClick={() => setConfirmDelete(false)}
						>
							Нет
						</button>
					</div>
				</div>
			</div>
			<div
				className={`${
					modal ? "bg-opacity-30" : "hidden bg-opacity-0"
				} transition-all duration-200 z-8 absolute top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center bg-sky-700 text-white`}
			>
				<div
					className={`z-9 bg-sky-700 relative flex flex-col items-center rounded-xl px-8 py-7 transition-all duration-200 ${
						modal ? "opacity-100" : "opacity-0"
					} w-[30rem]`}
				>
					<label className="font-bold text-2xl">Состав группы</label>
					<RxCross2
						className="h-6 w-6 absolute right-2 top-2 cursor-pointer"
						onClick={() => setModal(false)}
					/>
					<div className="transition-all duration-200 overflow-auto scrollbar-hide border-2 border-white h-[25rem] w-full rounded-md mt-4 p-2 flex flex-col gap-2">
						{group?.results[0]?.groupmember_set?.map(
							(member, index) => (
								<span
									key={index}
									className="border-b-2 border-white pb-0.5 flex flex-row-reverse items-center"
								>
									<div className="flex justify-center items-center">
										<RxCross2
											className="h-5 w-5 rounded-full text-white bg-red-700 cursor-pointer"
											onClick={() =>
												{
													setMemberToDelete(member.slug)
													setConfirmDelete(true)
												}
											}
										/>
									</div>
									<div className="flex-1" />
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

export default connect(mapStateToProps, {})(Trainer)
