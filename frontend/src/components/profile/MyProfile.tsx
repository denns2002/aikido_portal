import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import {
	useGetClubBySlugQuery,
	useGetGroupBySlugQuery,
	useGetMyProfileQuery,
} from "../../store/apis"
import { getAge, getCorrectDate, getRankProps } from "../../functions"
import { TbPhotoCancel } from "react-icons/tb"
import { useState } from "react"
import Dropdown from "../custom/Dropdown"
import { useActions } from "../../hooks"

interface MyProfileProps {
	isAuthenticated: boolean
}

function MyProfile({ isAuthenticated }: MyProfileProps) {
	const {
		data: profile,
		isLoading: profileIsLoading,
	} = useGetMyProfileQuery()

	const { data: club, isLoading: clubIsLoading } = useGetClubBySlugQuery(
		profile?.club ? profile?.club : ""
	)

	const { data: group, isLoading: groupIsLoading } = useGetGroupBySlugQuery(
		profile?.group ? profile?.group : ""
	)

	console.log(club, group);
	

	const rankProps = getRankProps(profile?.rank?.name || "")

	const {logOut} = useActions()

	return profileIsLoading || groupIsLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
		<div className="h-full w-full flex flex-col items-center">
			<div className="w-[60rem] flex flex-col gap-4">
				<div className="w-full flex flex-row gap-4 bg-white shadow-md p-2">
					<div className="h-[21rem] w-[19rem] bg-slate-300 flex justify-center items-center">
						<TbPhotoCancel className="text-white h-20 w-20" />
					</div>
					<div className="w-[19rem] flex flex-col">
						<div className="flex flex-col gap-4">
							<div className="flex flex-col text-3xl font-medium">
								<span>{profile?.last_name}</span>
								<span>{profile?.first_name}</span>
								<span>{profile?.mid_name}</span>
							</div>
							<div className="flex flex-col">
								<span className="text-lg font-medium">
									Дата рождения:
								</span>
								{profile?.birth_date ? (
									<span className="text-base">
										{getCorrectDate(profile.birth_date)}
									</span>
								) : (
									<span className="mt-2 text-base text-red-500">
										Не установлена
									</span>
								)}
							</div>
							<div className="flex flex-col">
								<span className="text-lg font-medium">
									Роль:
								</span>
								<span className="text-base">Тренер</span>
							</div>
							<div className="flex flex-col">
								<span className="text-lg font-medium">
									Ранг:
								</span>
								{
									rankProps ?  <div className={`w-[10rem] ${rankProps.backgroundColor} ${rankProps.textColor} font-medium text-lg text-center rounded-md`}>{rankProps.text}</div> : <span className="text-red-500">Еще не установлен</span>
								}
							</div>
							{/* <div className="flex flex-col">
								<span className="text-lg font-medium">
									Лицензия:
								</span>
								<span className="text-base">...</span>
							</div> */}
						</div>
					</div>
					<div className="w-[19rem] flex flex-col">
						<div className="flex flex-col text-xl gap-4">
							{/* <div className="flex flex-col">
								<span className="text-lg font-medium">
									Регион:
								</span>
								<span className="text-base">...</span>
							</div> */}
							<div className="flex flex-col">
								<span className="text-lg font-medium">
									Клуб:
								</span>
								<span className="text-base">{club ? club.name : "..."}</span>
							</div>
							<div className="h-[9rem] w-[9rem] bg-slate-300 flex justify-center items-center">
								<TbPhotoCancel className="text-white h-14 w-14" />
							</div>
						</div>
					</div>
				</div>
				<Dropdown title="Моя группа" defaultShow={true}>
					<div className="w-full flex flex-col gap-4">
						{group?.groupmembers?.map((member, index) => {
							const memberProfile = member.profile

                            const rankProps = getRankProps(memberProfile.rank?.name ? memberProfile.rank?.name : "")

							return (
								<div key={index} className="w-full shadow-md flex flex-row">
									<div className="p-2 flex-1 border-r-[1px] border-sky-500 text-xl font-medium">
										{memberProfile.last_name} {memberProfile.first_name} {memberProfile.mid_name}
									</div>
									<div className="flex flex-col p-2 w-[10rem] border-x-[1px] border-sky-500 text-xl gap-1">
										<div className={`${rankProps.backgroundColor} ${rankProps.textColor} text-lg rounded-md text-center font-medium`}>
                                            {rankProps.text}
                                        </div>
									</div>
									<div className="p-2 w-[5rem] border-l-[1px] border-sky-500 text-xl font-medium">
										{getAge(memberProfile?.birth_date ? memberProfile.birth_date : "")} лет
									</div>
								</div>
							)
						})}
					</div>
				</Dropdown>
				<Dropdown title="Мои мероприятия" defaultShow={true}>
					<>{"..."}</>
				</Dropdown>
				<div className="flex flex-row gap-4">
					<button className="flex-1 text-lg font-medium bg-slate-600 text-white hover:bg-slate-500 rounded-md p-1">
						Редактировать
					</button>
					<button className="flex-1 text-lg font-medium bg-red-600 text-white hover:bg-red-500 rounded-md p-1"
					onClick={logOut}>
						Выйти из аккаунта
					</button>
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
	return {
		isAuthenticated: state.authentication.isAuthenticated,
	}
}

export default connect(mapStateToProps, {})(MyProfile)
