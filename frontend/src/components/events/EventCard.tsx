import { NavLink } from "react-router-dom"
import { IEvent } from "../../store/types/events"
import { getCorrectDate } from "../../functions"
import { TbPhotoCancel } from "react-icons/tb"

interface EventCardProps {
	name: string
	slug: string
	image: string
}

function EventCard({ name, slug, image }: EventCardProps) {
	return (
		<div className="bg-white transition-all duration-200 w-[18rem] p-3 shadow-md">
			<div className="h-[16rem] w-[16.5rem] bg-slate-300 flex justify-center items-center">
				<TbPhotoCancel className="text-white h-20 w-20" />
			</div>
			<div className="text-xl font-semibold my-1">{name}</div>
			<div className="flex justify-center mt-5 mb-2">
				<NavLink to={`/events/${slug}`} className="text-base bg-slate-600 py-1 px-7 rounded-full text-white font-medium hover:bg-slate-500">
					подробнее
				</NavLink>
			</div>
		</div>
	)
}

export default EventCard
