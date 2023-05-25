import { connect } from "react-redux"
import { IRootState } from "../../store/store"
import { IProfile } from "../../store/types/profile"
import { FaUser } from 'react-icons/fa';
import { useGetClubBySlugQuery, useGetGroupBySlugQuery } from "../../store/apis";

interface ProfileProps {
    profile: IProfile
}

function ProfileMe({profile}: ProfileProps) {
    const {data: club} = useGetClubBySlugQuery(profile.club)
    const {data: group} = useGetGroupBySlugQuery(profile.group)

	return (
		<div className="">
			<div className="m-2 p-1 rounded-md bg-sky-700 text-white w-[30rem]">
                <div className="flex flex-row-reverse items-center">
                    <FaUser className="h-16 w-16 rounded-full border-4 bg-white border-white text-sky-700 m-1" />
                    <div className="flex-1" />
                    <div className="m-1">
                        <p>{profile.last_name}</p>
                        <p>{profile.first_name}</p>
                        <p>{profile.mid_name}</p>
                    </div>
                </div>
                <hr className="bg-white mx-1 my-1" />
                <div className="m-1">
                    Дата рождения: {profile.birth_date}
                </div>
                <hr className="bg-white mx-1 my-1" />
                <div className="m-1">
                    Клуб: {club?.name}
                </div>
                <div className="m-1">
                    Группа: {group?.name}
                </div>
            </div>
		</div>
	)
}

function mapStateToProps(state: IRootState) {
    return {
        profile: state.profile.profile
    }
}

export default connect(mapStateToProps, {})(ProfileMe)
