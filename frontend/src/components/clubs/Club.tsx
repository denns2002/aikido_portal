import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDeleteClubBySlugMutation, useGetClubBySlugQuery } from "../../store/apis";
import { IClub } from '../../store/types';
import { useState } from 'react';


function Club() {
    const {slug} = useParams()
    
    const {data, isLoading} = useGetClubBySlugQuery(slug ? slug : "")
    const [delClub, {}] = useDeleteClubBySlugMutation()
    const [deleteClub, setDeleteClub] = useState(false)
    const navigate = useNavigate()

    console.log(data)
    return isLoading ? (
		<div className="font-semibold text-lg">Идет загрузка</div>
	) : (
        <div className='flex flex-col text-center text-lg gap-5'>
            <div>
                <span className='font-bold'>Название:</span> {data?.name}
            </div>
            <div>
                <span className='font-bold'>Информация:</span> {data?.info}
            </div>
            <div>
                <span className='font-bold'>Активен:</span> {data?.is_active ? "Да": "Нет"}
            </div>
            <button>
                <NavLink
                    className="transition-all duration-200 font-semibold rounded-md p-1 py-2 h-9 hover:bg-sky-300 bg-sky-500 text-white"
                    to={`/clubs/${slug}/edit`}
                >
                Редактировать клуб  
                </NavLink>
            </button>
            
            <button
                className="transition-all duration-200 font-semibold rounded-md p-1 h-9 hover:bg-red-300 bg-red-500 text-white"
                type="button"
                onClick={async () => {
                    await delClub(slug ? slug : "")

                    navigate("/clubs")
                }}
            >
                Удалить клуб
            </button>
        </div>
    );
}

export default Club;